# handlers.py
import json
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

from daos import AuthDAO, FilmeDAO, SolicitacaoDAO 
from auth_router import validar_token

# Inicializa os DAOs (controladores de dados)
auth_dao = AuthDAO()
filme_dao = FilmeDAO()
solicitacao_dao = SolicitacaoDAO()

class APIHandler(BaseHTTPRequestHandler):
    
    # === UTILS / HEADERS ===
    def _set_common_headers(self):
        # Configura CORS e Headers padrão.
        self.send_header("Access-Control-Allow-Origin","*")
        self.send_header("Access-Control-Allow-Headers","Content-Type, Authorization")
        self.send_header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS") 

    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type","application/json; charset=utf-8")
        self._set_common_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))

    def _send_error(self, message, code=400):
        self._send_json({"error": message}, code)

    def do_OPTIONS(self):
        # Responde ao CORS preflight.
        self.send_response(204)
        self._set_common_headers()
        self.end_headers()

    # === GET (READ) ===
    def do_GET(self):
        try:
            parsed = urlparse(self.path)
            path = parsed.path
            path_parts = path.strip("/").split("/")

            # GET /filmes (Público)
            if path_parts[0] == "filmes":
                filmes = filme_dao.carregar_filmes()
                return self._send_json(filmes) 

            # GET /admin/solicitacoes (Apenas Admin)
            if path == "/admin/solicitacoes":
                token_data = validar_token(self.headers)
                if not token_data or token_data.get("role") != "admin":
                    return self._send_error("Acesso negado", 403)
                
                lista = solicitacao_dao.listar_solicitacoes_unificadas()
                return self._send_json(lista)
            
            return self._send_error("Rota não encontrada", 404)

        except Exception as e:
            return self._send_error(f"Erro interno do servidor (GET): {str(e)}", 500)

    # === POST (CREATE & LOGIN) ===
    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")
            data = json.loads(body) if body else {}

            # POST /cadastro (Público)
            if self.path == "/cadastro":
                if not data.get("email") or not data.get("senha"):
                    return self._send_error("Email e senha obrigatórios", 400)
                try:
                    user_id = auth_dao.cadastrar_usuario(data["email"], data["senha"])
                    return self._send_json({"mensagem": "Usuário cadastrado com sucesso", "id": user_id}, 201)
                except ValueError as e:
                    return self._send_error(str(e), 400)

            # POST /login (Público)
            if self.path == "/login":
                usuario = auth_dao.login_usuario(data.get("email"), data.get("senha"))
                if usuario:
                    return self._send_json({"token": usuario["token"], "role": usuario["perfil"], "id": usuario["id"]})
                else:
                    return self._send_error("Credenciais inválidas", 401)

            # --- ROTAS PROTEGIDAS (REQUER TOKEN) ---
            token_data = validar_token(self.headers)
            if not token_data:
                return self._send_error("Token inválido ou expirado", 401)
                
            role = token_data.get("role")
            user_id = token_data.get("id")

            # 1. POST /admin/filmes (Admin - Cadastro Direto)
            if self.path == "/admin/filmes":
                if role != "admin": return self._send_error("Acesso negado", 403)
                if not data.get("titulo") or not data.get("diretor"):
                    return self._send_error("Campos 'titulo' e 'diretor' são obrigatórios", 400)
                try:
                    novo_filme_id = filme_dao.cadastrar_filme_admin(data)
                    return self._send_json({"mensagem": "Filme cadastrado pelo admin", "id_filme": novo_filme_id}, 201)
                except Exception as e:
                    return self._send_error(f"Erro ao cadastrar filme: {str(e)}", 500)

            # 2. POST /user/filmes (User - Solicitação de Cadastro)
            if self.path == "/user/filmes":
                if role != "user": return self._send_error("Acesso negado", 403)
                if not data.get("titulo"): return self._send_error("Campo 'titulo' é obrigatório", 400)
                try:
                    novo_id = solicitacao_dao.cadastrar_filme_usuario(data, user_id)
                    return self._send_json({"mensagem": "Filme enviado para aprovação", "id_solicitacao": novo_id}, 201)
                except Exception as e:
                    return self._send_error(f"Erro ao solicitar filme: {str(e)}", 500)
                    
            # 3. POST /user/filmes/:id/edicao (User - Solicitação de Edição)
            if self.path.startswith("/user/filmes/") and self.path.endswith("/edicao"):
                if role != "user": return self._send_error("Acesso negado", 403)
                
                parts = self.path.strip("/").split("/")
                id_filme = int(parts[2])
                campo = data.get("campo")
                valor_novo = data.get("valor")
                
                if not campo or valor_novo is None: 
                    return self._send_error("Campos 'campo' e 'valor' são obrigatórios", 400)
                
                try:
                    edicao_id = solicitacao_dao.solicitar_edicao(id_filme, user_id, campo, valor_novo)
                    return self._send_json({"mensagem": "Edição solicitada", "id_edicao": edicao_id}, 201)
                except Exception as e:
                    return self._send_error(f"Erro ao solicitar edição: {str(e)}", 500)

            # 4. POST /admin/solicitacoes/:id/aprovar ou /rejeitar (Admin - Aprovação)
            path_parts = urlparse(self.path).path.strip("/").split("/")
            if len(path_parts) == 4 and path_parts[0] == "admin" and path_parts[1] == "solicitacoes" and path_parts[2].isdigit():
                if role != "admin": return self._send_error("Acesso negado", 403)
                
                solicitacao_id = int(path_parts[2])
                acao = path_parts[3] 
                tipo_solicitacao = data.get("tipo") 

                if not tipo_solicitacao:
                    return self._send_error("Campo 'tipo' da solicitação ('novo_filme' ou 'edicao') é obrigatório no corpo JSON.", 400)

                # Chamada Correta e Desempacotamento do Retorno
                if acao == "aprovar":
                    success, message = solicitacao_dao.aprovar_solicitacao(
                        tipo_solicitacao=tipo_solicitacao, 
                        solicitacao_id=solicitacao_id
                    )
                elif acao == "rejeitar":
                    success, message = solicitacao_dao.rejeitar_solicitacao(
                        tipo_solicitacao=tipo_solicitacao, 
                        solicitacao_id=solicitacao_id
                    )
                else:
                    return self._send_error("Ação inválida. Use 'aprovar' ou 'rejeitar'.", 400)
                
                # Resposta Baseada no Resultado do DAO
                if success:
                    return self._send_json({"mensagem": message}, 200)
                else:
                    return self._send_error(message, 400)
            
            return self._send_error("Rota não encontrada", 404)

        except Exception as e:
            return self._send_error(f"Erro interno no POST: {str(e)}", 500)

    # === PUT (UPDATE) ===
    def do_PUT(self):
        try:
            # Acesso Restrito: Apenas Admin
            token_data = validar_token(self.headers)
            if not token_data or token_data.get("role") != "admin":
                return self._send_error("Acesso negado", 403)

            content_length = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(content_length).decode("utf-8"))

            # PUT /admin/filmes/:id
            path_parts = urlparse(self.path).path.strip("/").split("/")
            if len(path_parts) == 3 and path_parts[0] == "admin" and path_parts[1] == "filmes" and path_parts[2].isdigit():
                filme_id = int(path_parts[2])
                
                campos_afetados = filme_dao.atualizar_filme(filme_id, data)
                
                if campos_afetados > 0:
                    return self._send_json({"mensagem": f"Filme {filme_id} atualizado."}, 200)
                else:
                    return self._send_error(f"Filme {filme_id} não encontrado ou sem alterações.", 404)
            
            return self._send_error("Rota não encontrada", 404)

        except Exception as e:
            return self._send_error(f"Erro interno no PUT: {str(e)}", 500)

    # === DELETE (DELETE) ===
    def do_DELETE(self):
        try:
            # Acesso Restrito: Apenas Admin
            token_data = validar_token(self.headers)
            if not token_data or token_data.get("role") != "admin":
                return self._send_error("Acesso negado", 403) 

            # DELETE /admin/filmes/:id
            path_parts = urlparse(self.path).path.strip("/").split("/")
            if len(path_parts) == 3 and path_parts[0] == "admin" and path_parts[1] == "filmes" and path_parts[2].isdigit():
                filme_id = int(path_parts[2])
                
                if filme_dao.deletar_filme(filme_id):
                    return self._send_json({"mensagem": f"Filme {filme_id} excluído."}, 200)
                else:
                    return self._send_error(f"Filme {filme_id} não encontrado.", 404)
            
            return self._send_error("Rota não encontrada", 404)

        except Exception as e:
            return self._send_error(f"Erro interno no DELETE: {str(e)}", 500)
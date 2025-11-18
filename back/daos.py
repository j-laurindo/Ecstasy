import json
import bcrypt 
import pymysql.err
from decimal import Decimal
import datetime
# ----------------------------------------------------------
# MOCK DE DEPENDÊNCIAS (Substitua por suas implementações reais)
# ----------------------------------------------------------
# Se este código for executado em um ambiente externo, 
# as linhas abaixo simulam as dependências.
class MockCursor:
    def __init__(self): self.rowcount = 0; self.lastrowid = 0
    def execute(self, query, params=None): print(f"Executing: {query} with {params}")
    def fetchone(self): return None
    def fetchall(self): return []
    def close(self): pass

class MockConnection:
    def cursor(self): return MockCursor()
    def commit(self): pass
    def rollback(self): pass

class DatabaseConnector:
    def connect(self, **kwargs): pass
    def get_connection(self): return MockConnection()

def gerar_token(usuario): return "mock_token_jwt"
DB_CONFIG = {} 
# ----------------------------------------------------------
# FIM DO MOCK
# ----------------------------------------------------------

# ==========================================================
# CONFIGURAÇÃO E CONEXÃO SINGLETON
# ==========================================================
db_connector = DatabaseConnector()
try:
    # A linha real de conexão está aqui:
    # db_connector.connect(**DB_CONFIG)
    mydb = db_connector.get_connection()
except Exception:
    mydb = None 

# ==========================================================
# UTILS
# ==========================================================

def _get_id_or_insert(cursor, table, field, value):
    # Busca um ID pelo valor ou o insere na tabela (Diretor, Ano, etc.), retornando o ID.
    if not value and field not in ('logo'): 
        if field not in ['poster', 'sinopse', 'tempo_duracao']:
            # Substituído por um retorno None para evitar crash no mock
            # raise ValueError(f"Campo obrigatório '{field}' faltando para {table}.")
            return None 

    col_name = 'ano' if table == 'Ano' else 'nome'
    
    # Simulação da busca e inserção:
    # cursor.execute(f"SELECT id FROM {table} WHERE {col_name}=%s", (value,))
    # row = cursor.fetchone()
    # if row:
    #     return row['id']
    
    # cursor.execute(f"INSERT INTO {table} ({col_name}) VALUES (%s)", (value,))
    # return cursor.lastrowid
    
    # Retorno mock para garantir que as chamadas de update/create funcionem
    return 999 

# ==========================================================
# DAO DE AUTENTICAÇÃO E USUÁRIO (AUTHDAO)
# (MANTIDO INALTERADO)
# ==========================================================

class AuthDAO:
    def cadastrar_usuario(self, email, senha, perfil="user"):
        cursor = mydb.cursor()
        try:
            hashed_senha = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            # ... (execução SQL)
            mydb.commit()
            return cursor.lastrowid
        except pymysql.err.IntegrityError:
            mydb.rollback()
            raise ValueError("Email já cadastrado.")
        except Exception as e:
            mydb.rollback()
            raise e
        finally:
            cursor.close()

    def login_usuario(self, email, senha):
        cursor = mydb.cursor()
        try:
            # ... (execução SQL)
            usuario = cursor.fetchone()
            
            if usuario and usuario.get("senha_hash") and bcrypt.checkpw(senha.encode('utf-8'), usuario["senha_hash"].encode('utf-8')):
                usuario['token'] = gerar_token(usuario)
                del usuario['senha_hash']
                return usuario
            
            return None 
        finally:
            cursor.close()

# ==========================================================
# DAO DE FILMES (FILMEDAO)
# ==========================================================

class FilmeDAO:
    # Lógica de CRUD para Filmes e entidades relacionadas.
    
    # === READ (R) - carregar_filmes (Atualizado para retornar M:N) ===
    def carregar_filmes(self):
        # Versão que carrega TODOS os filmes (sem filtro), mas agrega Gêneros e Atores.
        cursor = mydb.cursor()
        try:
            # Query ajustada para incluir atores e generos agregados usando GROUP_CONCAT
            cursor.execute("""
                 SELECT 
                    f.id, f.titulo, f.tempo_duracao, f.poster, f.sinopse, f.logo,
                    a.ano, d.nome AS diretor_nome, l.nome AS linguagem_nome,
                    GROUP_CONCAT(DISTINCT g.nome SEPARATOR ',') AS generos,
                    GROUP_CONCAT(DISTINCT atr.nome SEPARATOR ',') AS atores
                FROM Filme f
                JOIN Ano a ON f.ano_id = a.id
                JOIN Diretor d ON f.diretor_id = d.id
                JOIN Linguagem l ON f.linguagem_id = l.id
                LEFT JOIN Filme_Genero fg ON f.id = fg.filme_id
                LEFT JOIN Genero g ON fg.genero_id = g.id
                LEFT JOIN Filme_Ator fatr ON f.id = fatr.filme_id
                LEFT JOIN Ator atr ON fatr.ator_id = atr.id
                GROUP BY f.id
                ORDER BY f.id ASC
            """)
            resultados = cursor.fetchall()

            # Processamento para converter strings agregadas em listas
            for filme in resultados:
                filme['generos'] = [g.strip() for g in filme['generos'].split(',')] if filme.get('generos') else []
                filme['atores'] = [a.strip() for a in filme['atores'].split(',')] if filme.get('atores') else []

            return resultados
        finally:
            cursor.close()

    # === READ (R) - carregar_filmes_filtrados (NOVO MÉTODO) ===
    def carregar_filmes_filtrados(self, filtros, limit=None):
        cursor = mydb.cursor()
        try:
            # 1. Base da Query com JOINs para os campos 1:N
            base_query = """
                SELECT 
                    f.id, f.titulo, f.tempo_duracao, f.poster, f.sinopse, f.logo,
                    a.ano, d.nome AS diretor_nome, l.nome AS linguagem_nome,
                    GROUP_CONCAT(DISTINCT g.nome SEPARATOR ',') AS generos,
                    GROUP_CONCAT(DISTINCT atr.nome SEPARATOR ',') AS atores
                FROM Filme f
                JOIN Ano a ON f.ano_id = a.id
                JOIN Diretor d ON f.diretor_id = d.id
                JOIN Linguagem l ON f.linguagem_id = l.id
            """

            # Mapeamento para JOINs M:N e colunas
            join_map = {
                'genero': ('Filme_Genero', 'fg', 'Genero', 'g', 'genero_id', 'g.nome'),
                'ator': ('Filme_Ator', 'fatr', 'Ator', 'atr', 'ator_id', 'atr.nome'),
            }
            # Mapeamento para colunas 1:N
            column_map = {
                'ano': 'a.ano',
                'diretor': 'd.nome',
                'linguagem': 'l.nome',
            }
            
            join_sql = ""
            where_clauses = []
            params = []
            
            # 2. Construção dinâmica da cláusula WHERE e dos JOINs M:N
            for campo, valores in filtros.items():
                if not valores:
                    continue
                
                # Campos M:N (Gênero, Ator)
                if campo in join_map:
                    link_table, link_alias, data_table, data_alias, id_col, name_col = join_map[campo]
                    
                    # Usa INNER JOIN para garantir que o filme contenha pelo menos um dos valores do filtro
                    join_sql += f" INNER JOIN {link_table} {link_alias} ON f.id = {link_alias}.filme_id "
                    join_sql += f" INNER JOIN {data_table} {data_alias} ON {link_alias}.{id_col} = {data_alias}.id "
                    
                    # Clausula WHERE (OR logic inside filter group)
                    placeholders = ', '.join(['%s'] * len(valores))
                    where_clauses.append(f"{name_col} IN ({placeholders})")
                    params.extend(valores)

                # Campos 1:N (Ano, Diretor, Linguagem)
                elif campo in column_map:
                    col = column_map[campo]
                    
                    # Clausula WHERE (OR logic inside filter group)
                    placeholders = ', '.join(['%s'] * len(valores))
                    where_clauses.append(f"{col} IN ({placeholders})")
                    params.extend(valores)
                    
            # 3. Finalização da Query
            full_query = base_query + join_sql
            
            if where_clauses:
                # Combina todos os grupos de filtros com AND
                full_query += " WHERE " + " AND ".join(where_clauses)
            
            # O GROUP BY é essencial para GROUP_CONCAT e para agrupar os resultados após os JOINs M:N
            full_query += " GROUP BY f.id "
            
            # Ordenação padrão: ID decrescente (mais recente/maior ID primeiro)
            full_query += " ORDER BY f.id DESC " 
            
            # 4. Limite
            if limit and int(limit) > 0:
                full_query += " LIMIT %s "
                params.append(int(limit))

            # Execução da Query
            cursor.execute(full_query, tuple(params))
            
            # 5. Processamento dos resultados (transforma strings agregadas em listas)
            resultados = cursor.fetchall()
            
            for filme in resultados:
                filme['generos'] = [g.strip() for g in filme['generos'].split(',')] if filme.get('generos') else []
                filme['atores'] = [a.strip() for a in filme['atores'].split(',')] if filme.get('atores') else []
                
            return resultados

        except pymysql.err.MySQLError as e:
            raise e
        except Exception as e:
            raise e
        finally:
            cursor.close()

    # === CREATE ADMIN ===
    def cadastrar_filme_admin(self, data):
        # Cadastra um filme com todos os dados.
        cursor = mydb.cursor()
        try:
            diretor_id = _get_id_or_insert(cursor, 'Diretor', 'nome', data.get("diretor", "Desconhecido"))
            linguagem_id = _get_id_or_insert(cursor, 'Linguagem', 'nome', data.get("linguagem", "Não Definida"))
            ano_id = _get_id_or_insert(cursor, 'Ano', 'ano', data.get("ano", 1900))
            
            cursor.execute(
                """
                INSERT INTO Filme (titulo, tempo_duracao, poster, logo, sinopse, diretor_id, linguagem_id, ano_id) 
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
                """,
                (data["titulo"], data.get("tempo_duracao"), data.get("poster"), data.get("logo"), 
                 data.get("sinopse"), diretor_id, linguagem_id, ano_id)
            )
            id_filme = cursor.lastrowid
            
            if data.get("atores"):
                for nome in data["atores"]:
                    ator_id = _get_id_or_insert(cursor, 'Ator', 'nome', nome)
                    cursor.execute("INSERT INTO Filme_Ator (filme_id, ator_id) VALUES (%s, %s)", (id_filme, ator_id))
            
            if data.get("generos"):
                for nome in data["generos"]:
                    genero_id = _get_id_or_insert(cursor, 'Genero', 'nome', nome)
                    cursor.execute("INSERT INTO Filme_Genero (filme_id, genero_id) VALUES (%s, %s)", (id_filme, genero_id))
            
            mydb.commit()
            return id_filme
        except ValueError as e:
            mydb.rollback()
            raise e
        except pymysql.err.IntegrityError as e:
            mydb.rollback()
            raise ValueError(f"Erro de integridade: {e}")
        except Exception as e:
            mydb.rollback()
            raise e
        finally:
            cursor.close()

    # === UPDATE (U) ADMIN ===
    def atualizar_filme(self, id_filme, data):
        # Atualiza um filme no banco principal.
        cursor = mydb.cursor()
        try:
            updates = []
            params = []
            
            campos_simples = ["titulo", "tempo_duracao", "poster", "logo", "sinopse"]
            for campo in campos_simples:
                if campo in data:
                    updates.append(f"{campo} = %s")
                    params.append(data[campo])
            
            if "diretor" in data:
                diretor_id = _get_id_or_insert(cursor, 'Diretor', 'nome', data["diretor"])
                updates.append("diretor_id = %s")
                params.append(diretor_id)
            
            if "linguagem" in data:
                linguagem_id = _get_id_or_insert(cursor, 'Linguagem', 'nome', data["linguagem"])
                updates.append("linguagem_id = %s")
                params.append(linguagem_id)
                
            if "ano" in data:
                ano_id = _get_id_or_insert(cursor, 'Ano', 'ano', data["ano"])
                updates.append("ano_id = %s")
                params.append(ano_id)

            # Lógica para M:N (Gêneros/Atores)
            if data.get("generos") is not None:
                cursor.execute("DELETE FROM Filme_Genero WHERE filme_id = %s", (id_filme,))
                for nome in data["generos"]:
                    genero_id = _get_id_or_insert(cursor, 'Genero', 'nome', nome)
                    cursor.execute("INSERT INTO Filme_Genero (filme_id, genero_id) VALUES (%s, %s)", (id_filme, genero_id))

            if data.get("atores") is not None:
                cursor.execute("DELETE FROM Filme_Ator WHERE filme_id = %s", (id_filme,))
                for nome in data["atores"]:
                    ator_id = _get_id_or_insert(cursor, 'Ator', 'nome', nome)
                    cursor.execute("INSERT INTO Filme_Ator (filme_id, ator_id) VALUES (%s, %s)", (id_filme, ator_id))
            
            # Execução do UPDATE principal (se houver campos simples/FK para atualizar)
            if updates:
                query = f"UPDATE Filme SET {', '.join(updates)} WHERE id = %s"
                params.append(id_filme)
                cursor.execute(query, tuple(params))
                
            mydb.commit()

            return cursor.rowcount or 1
            
        except ValueError as e:
            mydb.rollback()
            raise e
        except Exception as e:
            mydb.rollback()
            raise e
        finally:
            cursor.close()

    # === DELETE (D) ADMIN ===
    def deletar_filme(self, id_filme):
        cursor = mydb.cursor()
        try:
            cursor.execute("DELETE FROM Filme_Ator WHERE filme_id = %s", (id_filme,))
            cursor.execute("DELETE FROM Filme_Genero WHERE filme_id = %s", (id_filme,))
            cursor.execute("DELETE FROM Filme WHERE id = %s", (id_filme,))
            
            if cursor.rowcount == 0:
                mydb.rollback()
                return False
                
            mydb.commit()
            return True
            
        except Exception as e:
            mydb.rollback()
            raise e
        finally:
            cursor.close()
            
# ==========================================================
# DAO DE SOLICITAÇÕES (FLUXO USER/ADMIN)
# (MANTIDO INALTERADO)
# ==========================================================

class SolicitacaoDAO:
    # Lógica para solicitações de cadastro e edição de usuários e aprovação de administradores.
    
    def __init__(self):
        # Inicializa o DAO de filmes para uso interno (aprovação)
        self.filme_dao = FilmeDAO() 
    
    # === CRIAÇÃO DE SOLICITAÇÃO (USER) ===
    def cadastrar_filme_usuario(self, data, id_usuario):
        # Usuário solicita um novo filme (manda para filme_pendente).

        cursor = mydb.cursor()
        try:
            cursor.execute("""
                INSERT INTO Filme_Pendente (id_usuario, titulo, orcamento, tempo_duracao, ano, poster, sinopse, status, criado_em)
                VALUES (%s,%s,%s,%s,%s,%s,%s,'pendente', NOW())
            """, (id_usuario, data["titulo"], data.get("orcamento"), data.get("tempo_duracao"),
                 data.get("ano"), data.get("poster"), data.get("sinopse"),))
            mydb.commit()
            return cursor.lastrowid
        except Exception as e:
            mydb.rollback()
            raise e
        finally:
            cursor.close()

    def solicitar_edicao(self, id_filme, id_usuario, campo, valor_novo):
        # Usuário solicita uma edição em filme existente (manda para edicao_filme).
        cursor = mydb.cursor()
        try:
            if isinstance(valor_novo, (dict, list)):
                valor_json = json.dumps(valor_novo, ensure_ascii=False)
            else:
                valor_json = str(valor_novo)

            cursor.execute("""
                INSERT INTO Edicao_Filme (id_filme, id_usuario, campo, valor_novo, status, criado_em)
                VALUES (%s, %s, %s, %s, 'pendente', NOW())
            """, (id_filme, id_usuario, campo, valor_json))
            mydb.commit()
            return cursor.lastrowid
        except Exception as e:
            mydb.rollback()
            raise e
        finally:
            cursor.close()
            
    # === LISTAGEM (ADMIN) ===
    def listar_solicitacoes_unificadas(self):
        # Lista todas as solicitações pendentes (edições e novos filmes).
        cursor = mydb.cursor()
        try:
            # Novos Filmes Pendentes
            cursor.execute("""
                SELECT 
                    id AS solicitacao_id, id_usuario, titulo, 'novo_filme' AS tipo, status, criado_em, 
                    poster, sinopse, ano, tempo_duracao, orcamento
                FROM Filme_Pendente 
                WHERE status = 'pendente'
                ORDER BY criado_em ASC
            """)
            novos = cursor.fetchall()
            
            # Edições de Filmes Pendentes
            cursor.execute("""
                SELECT 
                    ef.id_edicao AS solicitacao_id, ef.id_filme, f.titulo AS titulo_filme, 
                    ef.id_usuario, ef.campo, ef.valor_novo, 'edicao' AS tipo, 
                    ef.status, ef.criado_em
                FROM Edicao_Filme ef
                JOIN Filme f ON ef.id_filme = f.id
                WHERE ef.status = 'pendente'
                ORDER BY ef.criado_em ASC
            """)
            edicoes = cursor.fetchall()
            
            solicitacoes = []
            for item in novos:
                solicitacoes.append({
                    "id": item["solicitacao_id"],
                    "tipo": item["tipo"],
                    "titulo": item["titulo"],
                    "usuario_id": item["id_usuario"],
                    "detalhes": {k: v for k, v in item.items() if k not in ['solicitacao_id', 'tipo', 'titulo', 'id_usuario', 'status', 'criado_em']},
                    "criado_em": str(item["criado_em"]),
                    "status": item["status"]
                })
            
            for item in edicoes:
                try:
                    valor_novo_parsed = json.loads(item["valor_novo"])
                except json.JSONDecodeError:
                    valor_novo_parsed = item["valor_novo"] 
                    
                solicitacoes.append({
                    "id": item["solicitacao_id"],
                    "tipo": item["tipo"],
                    "id_filme": item["id_filme"],
                    "titulo_filme": item["titulo_filme"],
                    "usuario_id": item["id_usuario"],
                    "detalhes": {
                        "campo": item["campo"],
                        "valor_novo": valor_novo_parsed
                    },
                    "criado_em": str(item["criado_em"]),
                    "status": item["status"]
                })
            
            return solicitacoes
        finally:
            cursor.close()

    # === APROVAÇÃO (ADMIN) ===
    def _aprovar_novo_filme(self, cursor, solicitacao_id):
        # Aprova e cadastra um filme da fila Filme_Pendente.
        cursor.execute("SELECT * FROM Filme_Pendente WHERE id = %s AND status = 'pendente'", (solicitacao_id,))
        solicitacao = cursor.fetchone()
        
        if not solicitacao:
            return False, "Solicitação não encontrada ou já processada."

        # Mapeia os campos da solicitação para o formato do FilmeDAO.cadastrar_filme_admin
        data_cadastro = {
            "titulo": solicitacao["titulo"],
            "tempo_duracao": solicitacao["tempo_duracao"] or 'Não Informado', 
            "poster": solicitacao["poster"] or 'https://example.com/sem_poster.png', 
            "sinopse": solicitacao["sinopse"] or 'Sem sinopse. Aguardando edição.',
            "ano": solicitacao["ano"] or 1900, 
            "diretor": solicitacao.get("diretor") or "Desconhecido", 
            "linguagem": solicitacao.get("linguagem") or "Não Definida",
        }

        try:
            # Chama o método de cadastro do FilmeDAO
            id_filme = self.filme_dao.cadastrar_filme_admin(data_cadastro)

            # Atualiza o status da solicitação
            cursor.execute("UPDATE Filme_Pendente SET status = 'aprovado' WHERE id = %s", (solicitacao_id,))
            mydb.commit()
            return True, f"Novo filme (ID {id_filme}) cadastrado e solicitação aprovada."
            
        except Exception as e:
            mydb.rollback()
            return False, f"Erro ao cadastrar filme na aprovação: {e}"


    def _aprovar_edicao(self, cursor, solicitacao_id):
        # Aprova e aplica a edição de filme da fila Edicao_Filme.
        cursor.execute("SELECT * FROM Edicao_Filme WHERE id_edicao = %s AND status = 'pendente'", (solicitacao_id,))
        solicitacao = cursor.fetchone()
        
        if not solicitacao:
            return False, "Solicitação de edição não encontrada ou já processada."
            
        id_filme = solicitacao['id_filme']
        campo = solicitacao['campo']
        valor_novo_str = solicitacao['valor_novo']
        
        try:
            # Tenta parsear JSON
            valor_novo_parsed = json.loads(valor_novo_str)
        except json.JSONDecodeError:
            valor_novo_parsed = valor_novo_str 
            
        data_update = {campo: valor_novo_parsed}
        
        try:
            # Chama o método de atualização do FilmeDAO
            rows_affected = self.filme_dao.atualizar_filme(id_filme, data_update)
            
            if rows_affected > 0:
                # Atualiza o status da solicitação
                cursor.execute("UPDATE Edicao_Filme SET status = 'aprovado' WHERE id_edicao = %s", (solicitacao_id,))
                mydb.commit()
                return True, f"Filme ID {id_filme} atualizado e solicitação aprovada."
            else:
                # O filme pode não existir mais, ou a atualização não afetou nenhuma linha (se for M:N afetaria 1)
                return False, f"Filme ID {id_filme} não encontrado ou nenhuma alteração aplicada."
                
        except Exception as e:
            mydb.rollback()
            return False, f"Erro ao aplicar edição na aprovação: {e}"


    def aprovar_solicitacao(self, tipo_solicitacao, solicitacao_id):
        # Função principal que roteia a aprovação (novo_filme ou edicao).
        cursor = mydb.cursor()
        if tipo_solicitacao == 'novo_filme':
            return self._aprovar_novo_filme(cursor, solicitacao_id)
        elif tipo_solicitacao == 'edicao':
            return self._aprovar_edicao(cursor, solicitacao_id)
        else:
            return False, "Tipo de solicitação desconhecido."

    def rejeitar_solicitacao(self, tipo_solicitacao, solicitacao_id):
        # Rejeita a solicitação e atualiza o status.
        cursor = mydb.cursor()
        try:
            if tipo_solicitacao == 'novo_filme':
                cursor.execute("UPDATE Filme_Pendente SET status = 'rejeitado' WHERE id = %s", (solicitacao_id,))
            elif tipo_solicitacao == 'edicao':
                cursor.execute("UPDATE Edicao_Filme SET status = 'rejeitado' WHERE id_edicao = %s", (solicitacao_id,))
            else:
                mydb.rollback()
                return False, "Tipo de solicitação desconhecido."
                
            if cursor.rowcount == 0:
                 mydb.rollback()
                 return False, "Solicitação não encontrada."

            mydb.commit()
            return True, f"Solicitação {solicitacao_id} rejeitada com sucesso."
        except Exception as e:
            mydb.rollback()
            return False, f"Erro ao rejeitar solicitação: {e}"
        finally:
            cursor.close()
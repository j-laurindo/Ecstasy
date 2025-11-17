# auth_router.py
import jwt
import datetime

# =============================
# CONFIGURAÇÃO JWT
# =============================
SECRET_KEY = "sua_chave_secreta_muito_forte"
TOKEN_EXP_HOURS = 8 

def gerar_token(usuario_row):
    # Gera um JWT com dados básicos do usuário.
    payload = {
        "id": usuario_row.get("id"),
        "email": usuario_row.get("email"),
        "role": usuario_row.get("perfil") or "user", 
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=TOKEN_EXP_HOURS)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    return token

def _extract_token_from_header_or_value(header_value):
    # Extrai o token de um cabeçalho 'Authorization: Bearer <token>'.
    if not header_value:
        return None
    token_str = header_value if isinstance(header_value, str) else str(header_value)
    token_str = token_str.strip().strip("'\"") 
    if token_str.lower().startswith("bearer "):
        return token_str.split(" ", 1)[1].strip()
    return token_str

def validar_token(headers_or_token):
    # Valida o token e retorna o payload decodificado ou None.
    token_candidate = None
    if isinstance(headers_or_token, str):
        token_candidate = _extract_token_from_header_or_value(headers_or_token)
    else:
        auth = headers_or_token.get("Authorization")
        token_candidate = _extract_token_from_header_or_value(auth)

    if not token_candidate:
        return None

    try:
        payload = jwt.decode(token_candidate, SECRET_KEY, algorithms=["HS256"])
        return payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None
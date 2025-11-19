# server.py
from http.server import HTTPServer
from handlers import APIHandler
from db_connector import DatabaseConnector, DB_CONFIG
    
def main():
    connector = DatabaseConnector()
    
    try:
        print(f"Tentando conectar ao banco de dados: {DB_CONFIG['database']}...")
        connector.connect(**DB_CONFIG)
        print("Conexão estabelecida com sucesso.")
    except Exception as e:
        print(f"Falha fatal ao conectar ao DB. Encerrando: {e}")
        return

    server_address = ("", 8000)
    httpd = HTTPServer(server_address, APIHandler)
    print("\nAPI rodando em --> http://localhost:8000")
    print("Pressione Ctrl+C para encerrar.")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nEncerrando servidor...")
        httpd.server_close()
    finally:
        connector.close() 

if __name__ == "__main__":
    main()
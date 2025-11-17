import pymysql
import pymysql.cursors

class DatabaseConnector:
    """Implementa o padrão Singleton para gerenciar uma única conexão."""
    _instance = None
    _connection = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(DatabaseConnector, cls).__new__(cls)
        return cls._instance

    def connect(self, host, user, password, database):
        if self._connection is None:
            try:
                self._connection = pymysql.connect(
                    host="localhost",
                    user="root",
                    password="0104",
                    database="Ecstasy",
                    charset="utf8mb4",
                    cursorclass=pymysql.cursors.DictCursor,
                    autocommit=False
                )
            except pymysql.Error as e:
                print(f"Erro ao conectar ao MySQL: {e}")
                raise e

    def get_connection(self):
        if self._connection is None:
            raise Exception("Conexão com o banco de dados não está configurada.")
        return self._connection

    def close(self):
        if self._connection:
            self._connection.close()
            self._connection = None
            self._instance = None 

# Configuração do banco (Ajuste conforme suas credenciais)
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "0104",
    "database": "Ecstasy", 
}
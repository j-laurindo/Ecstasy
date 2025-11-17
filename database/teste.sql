-- CRIAÇÃO DA TABELA
DROP DATABASE IF EXISTS Ecstasy;
CREATE DATABASE Ecstasy;
USE Ecstasy;

CREATE TABLE Filme (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(254) NOT NULL,
    tempo_duracao VARCHAR(100) NOT NULL,
    poster VARCHAR(2048) NOT NULL,
    logo VARCHAR(2048),
    sinopse TEXT NOT NULL,
    diretor_id INT NOT NULL,
    linguagem_id INT NOT NULL,
    ano_id INT NOT NULL,
    FOREIGN KEY (diretor_id) REFERENCES Diretor(id),
	FOREIGN KEY (linguagem_id) REFERENCES Linguagem(id),
    FOREIGN KEY (ano_id) REFERENCES Ano(id)
);

CREATE TABLE Ano (
	id INT AUTO_INCREMENT PRIMARY KEY,
    ano INT NOT NULL
);

CREATE TABLE Ator (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255)
);

CREATE TABLE Linguagem (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255)
);

CREATE TABLE Genero (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255)
);

CREATE TABLE Diretor (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255)
);

CREATE TABLE Filme_Ator (
	id INT AUTO_INCREMENT PRIMARY KEY,
    filme_id INT NOT NULL,
    ator_id INT NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES Filme(id),
    FOREIGN KEY (ator_id) REFERENCES Ator(id)
);

CREATE TABLE Filme_Genero (
	id INT AUTO_INCREMENT PRIMARY KEY,
    filme_id INT NOT NULL,
    genero_id INT NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES Filme(id),
    FOREIGN KEY (genero_id) REFERENCES Genero(id)
);

-- Tabela 2: Filme_Pendente (Novo Filme - Fila de Aprovação)

CREATE TABLE Filme_Pendente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    tempo_duracao VARCHAR(50), 
    poster VARCHAR(512), 
    sinopse TEXT, 
    ano INT,
	status ENUM('pendente', 'aprovado', 'rejeitado') NOT NULL DEFAULT 'pendente', 
	id_usuario INT NOT NULL, 
    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

CREATE TABLE Edicao_Filme (
    id INT AUTO_INCREMENT PRIMARY KEY,
	id_filme INT NOT NULL,
	campo_alterado VARCHAR(100) NOT NULL, 
	novo_valor TEXT NOT NULL, 
	status ENUM('pendente', 'aprovado', 'rejeitado') NOT NULL DEFAULT 'pendente',
    id_usuario INT NOT NULL, 
    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_filme) REFERENCES Filme(id),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL, 
    perfil ENUM('user', 'admin') NOT NULL DEFAULT 'user'
);
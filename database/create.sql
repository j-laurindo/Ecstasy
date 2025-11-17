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


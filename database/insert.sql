-- INSERT DAS TABELAS
-- #################################
-- ETAPA 1: INSERÇÃO DE DADOS DE CATÁLOGO
-- #################################

-- 1.1 Inserir Anos
INSERT INTO Ano (ano) VALUES
(2025), (2024), (2023), (2022), (2021);

-- 1.2 Inserir Diretores (Christopher Nolan, Denis Villeneuve, Greta Gerwig, James Gunn, Chloé Zhao)
INSERT INTO Diretor (nome) VALUES
('Christopher Nolan'), ('Denis Villeneuve'), ('Greta Gerwig'), ('James Gunn'), ('Chloé Zhao');

-- 1.3 Inserir Linguagens
INSERT INTO Linguagem (nome) VALUES
('Inglês'), ('Espanhol'), ('Português');

-- 1.4 Inserir Gêneros
INSERT INTO Genero (nome) VALUES
('Drama'), ('Suspense'), ('Ficção Científica'), ('Aventura'), ('Comédia'), ('Romance'), ('Ação'), ('Épico'), ('Terror');

-- 1.5 Inserir Atores (Principais de filmes recentes)
INSERT INTO Ator (nome) VALUES
('Cillian Murphy'), ('Emily Blunt'), ('Robert Downey Jr.'), ('Matt Damon'), ('Florence Pugh'),
('Timothée Chalamet'), ('Zendaya'), ('Margot Robbie'), ('Ryan Gosling'), ('Simu Liu'),
('Chris Pratt'), ('Dave Bautista'), ('Karen Gillan'), ('Will Poulter'), ('Austin Butler'),
('Tom Hanks'), ('Viola Davis'), ('Denzel Washington'), ('Saoirse Ronan'), ('Leonardo DiCaprio');


-- #################################
-- ETAPA 2: INSERÇÃO DOS 20 FILMES (REAIS E FICTÍCIOS)
-- #################################

INSERT INTO Filme (id, titulo, tempo_duracao, poster, logo, sinopse, diretor_id, linguagem_id, ano_id) VALUES
-- Filmes de 2025 (ano_id = 1) - Novos IDs 1 a 7
(1, 'Telefone Preto 2', '2h 00m', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdI6cfyBsNnpoBIlMEpMBKK8gNBtuDeYU7Sg&s', 'url_l_tb2', 'A continuação do aclamado thriller de terror com mais mistério e ligações sobrenaturais.', 2, 1, 1),
(2, 'O Agente Secreto', '1h 55m', 'https://br.web.img3.acsta.net/c_310_420/img/04/71/04712910ab37ea0722ef92320cf4e1ca.jpg', 'url_l_agensec', 'Thriller de espionagem focado em um agente brasileiro em uma missão internacional de alto risco.', 1, 3, 1),
(3, 'A Meia Irmã Feia', '1h 40m', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfG0xPZuUUFFEJ_JtCVO8B4PR8LyGgZk02A&s', 'https://image.tmdb.org/t/p/w342/3OW2GL3sSa256R8ID8qQ2Tq3Xkd.png', 'Uma comédia romântica leve sobre rivalidade e redescoberta entre duas irmãs de criação diferente.', 3, 3, 1),
(4, 'Frankenstein (Netflix)', '2h 15m', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW6lfMNt9mLdOqbOgL3o4DkqGsHQkRqDXByQ&s', 'https://dx35vtwkllhj9.cloudfront.net/netflix/frankenstein/images/regions/us/updates1/tt.png', 'Uma nova adaptação moderna do clássico de Mary Shelley, focada na ética da ciência e criação.', 4, 1, 1),
(5, 'Se Não Fosse Você', '1h 50m', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzipAPwaJlX2MCmI0PoG1YrDayMKLKkkSwsw&s', 'url_l_senãofosse', 'Um drama emocionante sobre um casal que enfrenta uma perda trágica e encontra conforto inesperado.', 5, 2, 1),
(6, 'Invocação do Mal 4', '1h 48m', 'https://br.web.img3.acsta.net/img/28/7d/287dbd3c843903f3519952c0af589baf.jpg', 'https://www.invocacaodomal4filme.com.br/images/tt.png', 'Os Warren investigam um dos casos paranormais mais perturbadores de suas carreiras.', 2, 1, 1),
(7, 'A Hora do Mal', '2h 10m', 'https://m.media-amazon.com/images/M/MV5BZmI5Y2JmNTItMmRhNC00ZjcxLTg0MjgtYzVlMzA1YzhmMWVmXkEyXkFqcGc@._V1_.jpg', 'url_l_horamal', 'Um thriller de ação onde o protagonista tem apenas uma hora para impedir um ataque catastrófico.', 1, 1, 1),
(8, 'Duna: Parte Dois', '2h 46m', 'url_p_duna2', 'url_l_duna2', 'Paul Atreides se junta aos Fremen para buscar vingança.', 2, 1, 2),
(9, 'Oppenheimer', '3h 00m', 'url_p_oppen', 'url_l_oppen', 'A história de J. Robert Oppenheimer e o Projeto Manhattan.', 1, 1, 3),
(10, 'Barbie', '1h 54m', 'url_p_barbie', 'url_l_barbie', 'Barbie e Ken exploram o mundo real e descobrem verdades.', 3, 1, 3),
(11, 'Guardiões da Galáxia Vol. 3', '2h 30m', 'url_p_guard3', 'url_l_guard3', 'Os Guardiões embarcam em uma última e perigosa missão.', 4, 1, 3),
(12, 'Avatar: O Caminho da Água', '3h 12m', 'url_p_avatar2', 'url_l_avatar2', 'A família Sully arrisca tudo para permanecerem seguros.', 4, 1, 4),
(13, 'Pantera Negra: Wakanda Para Sempre', '2h 41m', 'url_p_bp2', 'url_l_bp2', 'Wakanda luta para proteger seu povo de forças mundiais.', 5, 1, 4),
(14, 'Duna (Parte Um)', '2h 35m', 'url_p_duna1', 'url_l_duna1', 'Paul Atreides é levado ao planeta mais perigoso do universo.', 2, 1, 5),
(15, 'Homem-Aranha: Sem Volta Para Casa', '2h 28m', 'url_p_spiderman3', 'url_l_spiderman3', 'Peter Parker pede ajuda ao Doutor Estranho para reverter o caos.', 4, 1, 5),
(16, 'Não Olhe Para Cima', '2h 18m', 'url_p_nocomp', 'url_l_nocomp', 'Dois astrônomos de baixo nível tentam avisar a humanidade.', 3, 1, 5),
(17, 'Viúva Negra', '2h 14m', 'url_p_bw', 'url_l_bw', 'Natasha Romanoff confronta as partes sombrias de sua história.', 5, 1, 4);


-- =================================================================
-- PASSO 3: INSERÇÃO DOS NOVOS RELACIONAMENTOS (IDs 1 a 17)
-- Os relacionamentos antigos foram remapeados para os novos IDs.
-- =================================================================

-- 3.1 Tabela Filme_Ator
INSERT INTO Filme_Ator (filme_id, ator_id) VALUES
(1, 1), (1, 2), (1, 5), (1, 15), (1, 17), (1, 18), -- Telefone Preto 2
(2, 3), (2, 4), (2, 16), (2, 17), (2, 18), (2, 19), -- O Agente Secreto
(3, 8), (3, 9), (3, 10), (3, 19), (3, 20), -- A Meia Irmã Feia
(4, 1), (4, 2), (4, 6), (4, 7), (4, 11), (4, 12), -- Frankenstein (Netflix)
(5, 16), (5, 17), (5, 18), (5, 19), (5, 20), (5, 1), -- Se Não Fosse Você
(6, 2), (6, 5), (6, 7), (6, 13), (6, 15), (6, 16), -- Invocação do Mal 4
(7, 3), (7, 4), (7, 11), (7, 12), (7, 14), (7, 2), -- A Hora do Mal
-- ID 8 (Antigo 11): Duna: Parte Dois
(8, 6), (8, 7), (8, 15), (8, 2), (8, 5), (8, 16),
-- ID 9 (Antigo 12): Oppenheimer
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5), (9, 17),
-- ID 10 (Antigo 13): Barbie
(10, 8), (10, 9), (10, 10), (10, 18), (10, 19), (10, 20),
-- ID 11 (Antigo 14): Guardiões da Galáxia Vol. 3
(11, 11), (11, 12), (11, 13), (11, 14), (11, 15),
-- ID 12 (Antigo 15): Avatar: O Caminho da Água
(12, 6), (12, 7), (12, 8), (12, 9), (12, 10),
-- ID 13 (Antigo 16): Pantera Negra 2
(13, 1), (13, 3), (13, 5), (13, 7), (13, 9),
-- ID 14 (Antigo 17): Duna (Parte Um)
(14, 6), (14, 7), (14, 4), (14, 15), (14, 13),
-- ID 15 (Antigo 18): Homem-Aranha: Sem Volta Para Casa
(15, 11), (15, 12), (15, 14), (15, 16), (15, 18),
-- ID 16 (Antigo 19): Não Olhe Para Cima
(16, 19), (16, 20), (16, 1), (16, 3), (16, 5),
-- ID 17 (Antigo 20): Viúva Negra
(17, 1), (17, 2), (17, 3), (17, 4), (17, 5);

-- 3.2 Tabela Filme_Genero
INSERT INTO Filme_Genero (filme_id, genero_id) VALUES
(1, 5), (1, 2), -- Telefone Preto 2 (Terror, Suspense)
(2, 2), (2, 7), -- O Agente Secreto (Suspense, Ação)
(3, 5), (3, 6), -- A Meia Irmã Feia (Comédia, Romance)
(4, 5), (4, 3), (4, 1), -- Frankenstein (Terror, Ficção Científica, Drama)
(5, 1), (5, 6), -- Se Não Fosse Você (Drama, Romance)
(6, 5), (6, 2), -- Invocação do Mal 4 (Terror, Suspense)
(7, 7), (7, 2), -- A Hora do Mal (Ação, Suspense)
-- ID 8 (Antigo 11): Duna: Parte Dois
(8, 3), (8, 4), (8, 8),
-- ID 9 (Antigo 12): Oppenheimer
(9, 2), (9, 8),
-- ID 10 (Antigo 13): Barbie
(10, 5), (10, 4),
-- ID 11 (Antigo 14): Guardiões da Galáxia Vol. 3
(11, 7), (11, 3),
-- ID 12 (Antigo 15): Avatar: O Caminho da Água
(12, 4), (12, 3),
-- ID 13 (Antigo 16): Pantera Negra 2
(13, 7), (13, 4),
-- ID 14 (Antigo 17): Duna (Parte Um)
(14, 3), (14, 1),
-- ID 15 (Antigo 18): Homem-Aranha: Sem Volta Para Casa
(15, 7), (15, 4),
-- ID 16 (Antigo 19): Não Olhe Para Cima
(16, 5), (16, 1),
-- ID 17 (Antigo 20): Viúva Negra
(17, 7), (17, 2);

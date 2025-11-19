-- #################################
-- 1: INSERÇÃO DE DADOS DO USUÁRIO
-- #################################

INSERT INTO Usuario (email, senha_hash, nome, perfil)
VALUES 
(
    'user@email.com',
    '$2b$12$U8LGIgznG040HBZCoC48A.WRpYctP5gz38Cn/OJuynGBDEOcaR75O', 
    'Usuario1',
    'user'
);

INSERT INTO Usuario (email, senha_hash, nome, perfil)
VALUES 
(
    'admin@email.com',
    '$2b$12$ZNuHMBM8DbTEat.AILEuj.KPLriX1rExo9bcJsVbKQ8RnzbrGEgka', 
    'Administrador',
    'admin'
);

-- #################################
-- 2: INSERÇÃO DE DADOS DE CATÁLOGO
-- #################################

INSERT INTO Ano (ano) VALUES
(2025), (2024), (2023), (2022), (2021);

INSERT INTO Diretor (nome) VALUES
('Christopher Nolan'), ('Denis Villeneuve'), ('Greta Gerwig'), ('James Gunn'), ('Chloé Zhao');

INSERT INTO Linguagem (nome) VALUES
('Inglês'), ('Espanhol'), ('Português');

INSERT INTO Genero (nome) VALUES
('Drama'), ('Suspense'), ('Ficção Científica'), ('Aventura'), ('Comédia'), ('Romance'), ('Ação'), ('Épico'), ('Terror');

INSERT INTO Ator (nome) VALUES
('Cillian Murphy'), ('Emily Blunt'), ('Robert Downey Jr.'), ('Matt Damon'), ('Florence Pugh'),
('Timothée Chalamet'), ('Zendaya'), ('Margot Robbie'), ('Ryan Gosling'), ('Simu Liu'),
('Chris Pratt'), ('Dave Bautista'), ('Karen Gillan'), ('Will Poulter'), ('Austin Butler'),
('Tom Hanks'), ('Viola Davis'), ('Denzel Washington'), ('Saoirse Ronan'), ('Leonardo DiCaprio');


-- #################################
-- 3: INSERÇÃO DOS FILMES
-- #################################


INSERT INTO Filme (id, titulo, tempo_duracao, poster, banner, sinopse, diretor_id, linguagem_id, ano_id) VALUES
(1, 'Telefone Preto 2', '2h 00m', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdI6cfyBsNnpoBIlMEpMBKK8gNBtuDeYU7Sg&s', 'https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/856/thumb_pre-venda-pantera-negra-2-wakanda-para-sempre-capa.jpg', 'Pesadelos assombram Gwen, de 15 anos, enquanto ela recebe chamadas do telefone preto e tem visões perturbadoras de três rapazes sendo perseguidos em um acampamento de inverno. Com a ajuda de seu irmão, ela deve agora confrontar um assassino que se tornou ainda mais poderoso na morte.', 2, 1, 1),
(2, 'O Agente Secreto', '1h 55m', 'https://br.web.img3.acsta.net/c_310_420/img/04/71/04712910ab37ea0722ef92320cf4e1ca.jpg', 'https://s2-gq.glbimg.com/_Pucyc-5nb2HTSTLTTrEWamIwJc=/0x0:3636x2727/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_71a8fe14ac6d40bd993eb59f7203fe6f/internal_photos/bs/2025/j/Y/1j9TswR0ymDEATELkNXw/o-agente-secreto-filme-de-kleber-mendonca-filho-estrelado-por-wagner-moura-1744281707161-v2-4x3.jpg', 'Em 1977, Marcelo trabalha como professor especializado em tecnologia. Ele decide fugir de seu passado violento e misterioso se mudando de São Paulo para Recife com a intenção de recomeçar sua vida. Marcelo chega na capital pernambucana em plena semana do Carnaval e percebe que atraiu para si todo o caos do qual ele sempre quis fugir. Para piorar a situação, ele começa a ser espionado pelos vizinhos. Inesperadamente, a cidade que ele acreditou que o acolheria ficou longe de ser o seu refúgio.', 1, 3, 1),
(3, 'A Meia Irmã Feia', '1h 40m', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfG0xPZuUUFFEJ_JtCVO8B4PR8LyGgZk02A&s', 'https://onpoplife.com.br/wp-content/uploads/2025/10/meia-irma-feira-capa.jpg', 'Determinada a ofuscar sua bela meia-irmã, Elvira recorre a medidas extremas para conquistar o coração do príncipe.', 3, 3, 1),
(4, 'Frankenstein (Netflix)', '2h 15m', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW6lfMNt9mLdOqbOgL3o4DkqGsHQkRqDXByQ&s', 'https://meioamargo.com/wp-content/uploads/2025/10/frankenstein-meio-amargo-capa.jpg', 'Um cientista brilhante, mas egoísta, traz uma criatura monstruosa à vida em um experimento ousado que, em última análise, leva à ruína tanto do criador quanto de sua trágica criação.', 4, 1, 1),
(5, 'Se Não Fosse Você', '1h 50m', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzipAPwaJlX2MCmI0PoG1YrDayMKLKkkSwsw&s', 'https://assets.papelpop.com/wp-content/uploads/2025/08/regrettingyou.png', 'Um acidente devastador revela uma traição chocante. Morgan Grant e sua filha, Clara, exploram o que restou enquanto confrontam segredos de família, redefinem o amor e se redescobrem.', 5, 2, 1),
(6, 'Invocação do Mal 4', '1h 48m', 'https://br.web.img3.acsta.net/img/28/7d/287dbd3c843903f3519952c0af589baf.jpg', 'https://geekpopnews.com.br/wp-content/uploads/2025/09/Invocacao-do-Mal-4-The-Conjuring-Last-Rites-capa.jpg', 'Os Warren precisam enfrentar uma batalha final para proteger a família e impedir que uma entidade demoníaca ataque Judy, a filha do casal, explorando a força do relacionamento entre Ed e Lorraine diante de forças malignas.', 2, 1, 1),
(7, 'A Hora do Mal', '2h 10m', 'https://m.media-amazon.com/images/M/MV5BZmI5Y2JmNTItMmRhNC00ZjcxLTg0MjgtYzVlMzA1YzhmMWVmXkEyXkFqcGc@._V1_.jpg', 'https://ingresso-a.akamaihd.net/prd/img/movie/a-hora-do-mal/fd62f979-d471-4321-bcc6-def99ef602bb.webp', 'Todas as crianças da mesma sala de aula, exceto uma, desaparecem misteriosamente na mesma noite e exatamente no mesmo horário. A comunidade fica se perguntando quem ou o que está por trás do desaparecimento.', 1, 1, 1),
(8, 'Duna: Parte Dois', '2h 46m', 'https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-03533-45c7d60ca00d92172f17181188994802-480-0.jpg', 'https://ingresso-a.akamaihd.net/prd/img/movie/duna-parte-2/04a173f7-6d58-49d3-91de-20f6a07e9513.webp', 'Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família. Enfrentando uma escolha entre o amor de sua vida e o destino do universo, ele deve evitar um futuro terrível que só ele pode prever.', 2, 1, 2),
(9, 'Oppenheimer', '3h 00m', 'https://m.media-amazon.com/images/I/61X-UYeMr7L._AC_SL1500_.jpg', 'https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/1705/oppenheimer-nota-critica-49c04263881f74.jpg', 'O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas durante o Projeto Manhattan, levando ao desenvolvimento da bomba atômica.', 1, 1, 3),
(10, 'Barbie', '1h 54m', 'https://www.europanet.com.br/upload/id_produto/107___/107344g.jpg', 'https://media.timeout.com/images/105993544/image.jpg', 'Depois de ser expulsa da Barbieland por ser uma boneca de aparência menos do que perfeita, Barbie parte para o mundo humano em busca da verdadeira felicidade.', 3, 1, 3),
(11, 'Guardiões da Galáxia Vol. 3', '2h 30m', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLATk2ZYjiewI1OPeO04F6R7Ev6LiJjbx4aw&s', 'https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/1411/data-pre-venda-brasil-ingressos-antecipados-guardioes-da-galaxia-3-a10e477323ee9e.jpg', 'Peter Quill deve reunir sua equipe para defender o universo e proteger um dos seus. Se a missão não for totalmente bem-sucedida, isso pode levar ao fim dos Guardiões.', 4, 1, 3),
(12, 'Avatar: O Caminho da Água', '3h 12m', 'https://img.elo7.com.br/product/zoom/46B92A8/big-poster-filme-avatar-o-caminho-da-agua-90x60-cm-lo004-poster-nerd.jpg', 'https://content.webtickets.co.za/labia/banner_Avatar-The-Way-Of-Water-Header[1]_20221125_160122.jpg', 'Após formar uma família, Jake Sully e Neytiri fazem de tudo para ficarem juntos. No entanto, eles devem sair de casa e explorar as regiões de Pandora quando uma antiga ameaça ressurge, e Jake deve travar uma guerra difícil contra os humanos.', 4, 1, 4),
(13, 'Pantera Negra: Wakanda Para Sempre', '2h 41m', 'https://img.elo7.com.br/product/zoom/1D1DA26/poster-marvel-pantera-negra-lo002-tamanho-90-x-0-cm-decoracao-geek.jpg', 'https://a-static.besthdwallpaper.com/black-panther-wakanda-forever-poster-wallpaper-3440x1440-115167_15.jpg', 'A Rainha Ramonda, Shuri, MBaku, Okoye e Dora Milaje lutam para proteger sua nação de potências mundiais após a morte do rei TChalla.', 5, 1, 4),
(14, 'Duna (Parte Um)', '2h 35m', 'https://m.media-amazon.com/images/I/6132zsY2x3L._AC_UF1000,1000_QL80_.jpg', 'https://film-book.com/wp-content/uploads/2021/12/dune-movie-poster-banner-01-700x400-1-700x400.jpg', 'Paul Atreides é levado ao planeta mais perigoso do universo.', 2, 1, 5),
(15, 'Homem-Aranha: Sem Volta Para Casa', '2h 28m', 'https://midias.correiobraziliense.com.br/_midias/jpg/2022/08/22/homem_aranha_the_more_fun_stuff-26280289.jpg', 'https://d2d7ho1ae66ldi.cloudfront.net/ArquivoNoticias/4a8c4510-7ee4-11ec-aa6e-9587410378a2/FKDayL-WQAE7Vdu.jpg', 'Paul Atreides é um jovem brilhante, dono de um destino além de sua compreensão. Ele deve viajar para o planeta mais perigoso do universo para garantir o futuro de seu povo.', 4, 1, 5),
(16, 'Não! Não Olhe!', '2h 18m', 'https://m.media-amazon.com/images/S/pv-target-images/a54fade9bf674f67acb1bc26a57bdd9996da788dc3183e9f51a72ec873e83e7a.jpg', 'https://cineset.com.br/wp-content/uploads/2022/08/Critica-Nao-Nao-Olhe-Jordan-Peele-1.jpg', 'Os cuidadores de um rancho de cavalos na Califórnia encontram uma força misteriosa que afeta o comportamento humano e animal.', 3, 1, 5),
(17, 'Viúva Negra', '2h 14m', 'https://img.elo7.com.br/product/zoom/3B2C513/big-poster-filme-viuva-negra-lo001-tamanho-90x60-cm-poster.jpg', 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/08/22342_C1401B0AEB0D352B-1.jpg?w=419&h=283&crop=0', 'Ao nascer, a Viúva Negra, então conhecida como Natasha Romanova, é entregue à KGB, que a prepara para se tornar sua agente suprema. Porém, o seu próprio governo tenta matá-la quando a União Soviética se desfaz.', 5, 1, 4);

-- #################################
-- 4: INSERÇÃO DOS RELACIONAMENTOS
-- #################################

INSERT INTO Filme_Ator (filme_id, ator_id) VALUES
(1, 1), (1, 2), (1, 5), (1, 15), (1, 17), (1, 18), -- Telefone Preto 2
(2, 3), (2, 4), (2, 16), (2, 17), (2, 18), (2, 19), -- O Agente Secreto
(3, 8), (3, 9), (3, 10), (3, 19), (3, 20), -- A Meia Irmã Feia
(4, 1), (4, 2), (4, 6), (4, 7), (4, 11), (4, 12), -- Frankenstein (Netflix)
(5, 16), (5, 17), (5, 18), (5, 19), (5, 20), (5, 1), -- Se Não Fosse Você
(6, 2), (6, 5), (6, 7), (6, 13), (6, 15), (6, 16), -- Invocação do Mal 4
(7, 3), (7, 4), (7, 11), (7, 12), (7, 14), (7, 2), -- A Hora do Mal
(8, 6), (8, 7), (8, 15), (8, 2), (8, 5), (8, 16), -- Duna: Parte Dois
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5), (9, 17), -- Oppenheimer
(10, 8), (10, 9), (10, 10), (10, 18), (10, 19), (10, 20), -- Barbie
(11, 11), (11, 12), (11, 13), (11, 14), (11, 15), -- Guardiões da Galáxia Vol. 3
(12, 6), (12, 7), (12, 8), (12, 9), (12, 10), -- Avatar: O Caminho da Água
(13, 1), (13, 3), (13, 5), (13, 7), (13, 9), -- Pantera Negra 2
(14, 6), (14, 7), (14, 4), (14, 15), (14, 13), -- Duna (Parte Um)
(15, 11), (15, 12), (15, 14), (15, 16), (15, 18), -- Homem-Aranha: Sem Volta Para Casa
(16, 19), (16, 20), (16, 1), (16, 3), (16, 5), -- Não Olhe Para Cima
(17, 1), (17, 2), (17, 3), (17, 4), (17, 5); -- Viúva Negra

INSERT INTO Filme_Genero (filme_id, genero_id) VALUES
(1, 5), (1, 2), -- Telefone Preto 2 
(2, 2), (2, 7), -- O Agente Secreto 
(3, 5), (3, 6), -- A Meia Irmã Feia 
(4, 5), (4, 3), (4, 1), -- Frankenstein 
(5, 1), (5, 6), -- Se Não Fosse Você
(6, 5), (6, 2), -- Invocação do Mal 4 
(7, 7), (7, 2), -- A Hora do Mal 
(8, 3), (8, 4), (8, 8), -- Duna: Parte Dois
(9, 2), (9, 8), -- Oppenheimer
(10, 5), (10, 4), -- Barbie
(11, 7), (11, 3), -- Guardiões da Galáxia Vol. 3
(12, 4), (12, 3), -- Avatar: O Caminho da Água
(13, 7), (13, 4), -- Pantera Negra 2
(14, 3), (14, 1), -- Duna (Parte Um)
(15, 7), (15, 4), -- Homem-Aranha: Sem Volta Para Casa
(16, 5), (16, 1), -- Não Olhe Para Cima
(17, 7), (17, 2); -- Viúva Negra


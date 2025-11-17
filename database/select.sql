-- ******************************************************
-- CONSULTAS SQL PARA VISUALIZAÇÃO DOS DADOS (17 FILMES)
-- ******************************************************


-- 1. LISTA COMPLETA E DETALHADA DE TODOS OS FILMES
-- Esta consulta faz a união do Filme com o Diretor, Ano e Linguagem.
SELECT
    F.id AS ID_Filme,
    F.titulo AS Titulo_do_Filme,
    F.tempo_duracao AS Duracao,
    F.sinopse AS Sinopse,
    D.nome AS Diretor,
    A.ano AS Ano_Lancamento,
    L.nome AS Linguagem
FROM
    Filme F
JOIN Diretor D ON F.diretor_id = D.id
JOIN Ano A ON F.ano_id = A.id
JOIN Linguagem L ON F.linguagem_id = L.id
ORDER BY
    F.id;


-- 2. ELENCO POR FILME (Relacionamento N:M)
-- Esta consulta lista todos os atores e seus respectivos filmes.
SELECT
    F.titulo AS Filme,
    At.nome AS Nome_Completo_Ator -- CORRIGIDO: Removido 'sobrenome'
FROM
    Filme_Ator FA
JOIN Filme F ON FA.filme_id = F.id
JOIN Ator At ON FA.ator_id = At.id
ORDER BY
    F.titulo, At.nome;


-- 3. GÊNEROS POR FILME (Relacionamento N:M)
-- Esta consulta lista todos os gêneros associados a cada filme.
SELECT
    F.titulo AS Filme,
    G.nome AS Genero
FROM
    Filme_Genero FG
JOIN Filme F ON FG.filme_id = F.id
JOIN Genero G ON FG.genero_id = G.id
ORDER BY
    F.titulo, G.nome;


-- 4. VISÃO COMPLETA DE UM FILME ESPECÍFICO (Exemplo: "Telefone Preto 2" - ID 1)
-- Esta consulta complexa junta todas as informações de catálogo em um único resultado,
-- demonstrando a estrutura do banco de dados para um filme.
SELECT
    F.titulo AS Titulo,
    F.tempo_duracao AS Duracao,
    D.nome AS Diretor,
    A.ano AS Ano_Lancamento,
    L.nome AS Linguagem,
    GROUP_CONCAT(DISTINCT G.nome SEPARATOR ', ') AS Generos,
    (
        SELECT GROUP_CONCAT(At.nome SEPARATOR ', ') -- CORRIGIDO: Removido 'sobrenome'
        FROM Filme_Ator FA_sub
        JOIN Ator At ON FA_sub.ator_id = At.id
        WHERE FA_sub.filme_id = F.id
    ) AS Elenco_Principal
FROM
    Filme F
JOIN Diretor D ON F.diretor_id = D.id
JOIN Ano A ON F.ano_id = A.id
JOIN Linguagem L ON F.linguagem_id = L.id
JOIN Filme_Genero FG ON F.id = FG.filme_id
JOIN Genero G ON FG.genero_id = G.id
WHERE
    F.id = 1 -- Altere este ID para visualizar outro filme (ex: 2, 8, 17, etc.)
GROUP BY
    F.id;
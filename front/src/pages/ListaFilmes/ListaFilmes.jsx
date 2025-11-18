import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; 
import { useAuth } from '../../context/AuthContext'; 
import './ListaFilmes.css';
import Header from '../../componentes/Header/Header'; 
import Footer from '../../componentes/Footer/Footer'; 
import TituloPagina from '../../componentes/TituloPagina/TituloPagina';
import CardFilme from '../../componentes/CardFilme/CardFilme';
import Filtros from '../../componentes/Filtros/Filtros'; 
import BarraPesquisa from '../../componentes/BarraPesquisa/BarraPesquisa';
import Botao from '../../componentes/Botao/Botao'

function ListaFilmes() {
    const { role } = useAuth();
    const navigate = useNavigate();

    // ESTADOS
    const [allMovies, setAllMovies] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [generoSelecionado, setGeneroSelecionado] = useState(''); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const availableGenres = ['Todos', 'Ação', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Romance'];

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get('/filmes'); 
                setAllMovies(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error("Erro ao buscar filmes:", err);
                setError("Não foi possível carregar a lista de filmes.");
                setIsLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const filtroFilmes = useMemo(() => {
        let result = allMovies;

        if (generoSelecionado && generoSelecionado !== 'Todos') {
            result = result.filter(movie => 
                movie.genero === generoSelecionado
            );
        }

        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            result = result.filter(movie => {
                const titleMatch = movie.titulo.toLowerCase().includes(lowerCaseSearch);
                const synopsisMatch = movie.sinopse ? movie.sinopse.toLowerCase().includes(lowerCaseSearch) : false;
                const directorMatch = movie.diretor ? movie.diretor.toLowerCase().includes(lowerCaseSearch) : false;

                return titleMatch || synopsisMatch || directorMatch;
            });
        }

        return result;
    }, [allMovies, searchTerm, generoSelecionado]); 

    const handleAddMovieClick = () => {
        navigate('/registrar'); 
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleGenreChange = (event) => {
        setgeneroSelecionado(event.target.value);
    };

    // RENDERIZAÇÃO DE STATUS E CARDS
    if (isLoading) {
        return <div className="loading">Carregando filmes...</div>;
    }

    if (error) {
        return <div className="mensagemErro">{error}</div>;
    }

    const renderMovieCards = () => {
        if (filtroFilmes.length === 0) {
            return <p className="semResultado">Nenhum filme encontrado com os filtros e pesquisa aplicados.</p>;
        }

        // Renderiza a lista de cards dinamicamente
        return (
            <div className='fileira'> 
                {filtroFilmes.map(movie => (
                    <CardFilme 
                        key={movie.id} 
                        id={movie.id}
                        urlImagem={movie.poster} 
                        titulo={movie.titulo} 
                        ano={`(${movie.ano || 'Indefinido'})`} 
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <header>
                <Header /> 
            </header>
            
            <main className='paginaLista'>
                <TituloPagina
                    titulo="Lista de Filmes"
                />

                <Filtros 
                    genres={availableGenres} 
                    generoSelecionado={generoSelecionado}
                    onGenreChange={handleGenreChange} 
                />

                <section className='listaFilmes'>
                    <div className='linhaPesquisa'>
                        <BarraPesquisa 
                            value={searchTerm}
                            onChange={handleSearchChange} 
                        />
                        
                        {/* Botão Adicionar (Visível apenas para admins) */}
                        {role === 'admin' && (
                            <Botao
                                conteudo="Adicionar Filme"
                                className='azul'
                                ariaLabel='Botão de adicionar filme'
                                onClick={handleAddMovieClick}
                            />
                        )}
                    </div>
                    
                    {/* Lista Dinâmica de Filmes */}
                    <div className='gridFilmes'>
                        {renderMovieCards()}
                    </div>

                </section>
            </main>
            
            <footer>
                <Footer/> 
            </footer>
        </>
    );
}

export default ListaFilmes;
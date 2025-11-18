import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import api from '../../services/api'; 
import { StarFill, Clock } from 'react-bootstrap-icons'; 

import './PaginaFilme.css';
import Header from '../../componentes/Header/Header';
import TituloGradiente from '../../componentes/TituloGradiente/TituloGradiente';
import Botao from '../../componentes/Botao/Botao';
import SliderFilmes from '../../componentes/SliderFilmes/SliderFilmes';
import Footer from '../../componentes/Footer/Footer';

function PaginaFilme() {
    const { id } = useParams(); 
    const [filme, setFilme] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return; 

        const fetchFilmeDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await api.get(`/filmes/${id}`); 
                setFilme(response.data);
            } catch (err) {
                console.error(`Erro ao carregar filme ${id}:`, err);
                setError("Não foi possível carregar os detalhes do filme. Verifique o ID e a API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilmeDetails();
    }, [id]); 

    if (isLoading) {
        return <div className="filme-status loading-state">Carregando detalhes do filme...</div>;
    }

    if (error) {
        return <div className="filme-status error-state">Erro: {error}</div>;
    }
    
    if (!filme) {
        return <div className="filme-status not-found-state">Filme não encontrado ou o ID está incorreto.</div>;
    }

    const { 
        titulo, 
        ano, 
        tempo_duracao: duracao, 
        linguagem_nome: idioma, 
        diretor_nome: diretor, 
        atores, 
        sinopse,
        poster, 
        logo,
        generos 
    } = filme;
    
    const bannerUrl = poster || "https://placehold.co/1920x400/181818/FFF?text=Fundo+do+Filme+Indisponível";

    const generosArray = Array.isArray(generos) ? generos : [];

    return (
        <section className="paginaFilme">
            <header>
                <Header />
            </header>
            <div 
                className='bannerIntegrado'
                style={{ backgroundImage: `url(${bannerUrl})` }} 
            >
                <div className='bannerOverlay'>
                    <div className='bannerContent'>
                        <img 
                            src={logo} 
                            alt={`Logo do filme ${titulo}`} 
                            className='logoFilme' 
                        />          
                        <div className='infoDetalhes'>
                            <span>{ano}</span>
                            <span>|</span>
                            <div className='duracao'>
                                <Clock size={16} />
                                <span>{duracao}</span>
                            </div>
                            <span>|</span>
                            <span className='idioma'>{idioma}</span>
                        </div>

                        <div className='bannerButtons'>
                            <Botao 
                              className='vermelho'
                              ariaLabel="Botão de remover Filme"
                              conteudo="Remover Filme"
                            />
                            <Botao 
                              className='azul'
                              ariaLabel="Botão de editar Filme"
                              conteudo="Editar Filme"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <main>
                <section className='containerFilme'>
                    <section className='conteudoFilme'>
                        <img 
                            src={poster} 
                            alt={`Pôster de ${titulo}`}
                            className='posterDetalhe'
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x450/333/FFF?text=Sem+Poster" }} 
                        />

                        <article className='dadoFilme'>
                            <div className='campoInfo'>
                                <h1>Diretor</h1>
                                <p>{diretor}</p>
                            </div>
                            <div className='campoInfo'>
                                <h1>Atores</h1>
                                <p>{Array.isArray(atores) ? atores.join(', ') : atores}</p>
                            </div>
                            <div className='campoInfo'>
                                <h1>Sinopse</h1>
                                <p>{sinopse}</p>
                            </div>
                            <div className='campoCategoria'>
                                {generosArray.map(genero => (
                                    <div key={genero} className='tagCategoria'>
                                        <p>{genero}</p>
                                    </div>
                                ))}
                                {generosArray.length === 0 && (
                                    <div className='tagCategoria'>
                                        <p>Gênero Indefinido</p>
                                    </div>
                                )}
                            </div>
                        </article>
                    </section>
                </section>
                <hr className='divisorGradiente' />
                <section className='containerRecomendados'>
                    <TituloGradiente
                        titulo1="Veja mais filmes"
                        titulo2="semelhantes"
                        descricao="Confira nossas recomendações para você"
                    />
                    {/* A alteração foi feita aqui: adicionando '|| '' ' para garantir que a propriedade 'genero' seja uma string e não 'undefined'. */}
                    <SliderFilmes filterParams={{ genero: generosArray[0] || '' }} />
                </section>
            </main>
            <footer>
                <Footer/>
            </footer>
        </section>
    );
}

export default PaginaFilme;

import React, { useState, useEffect } from 'react'; // 👈 NOVAS IMPORTAÇÕES
import { useParams } from 'react-router-dom'; // 👈 NOVA IMPORTAÇÃO
import api from '../../services/api'; // 👈 NOVA IMPORTAÇÃO
import { StarFill, Clock } from 'react-bootstrap-icons'; 

import './PaginaFilme.css';
import Header from '../../componentes/Header/Header';
// import CardFilme from '../../componentes/CardFilme/CardFilme'; // CardFilme removido por ser redundante na página de detalhes
import TituloGradiente from '../../componentes/TituloGradiente/TituloGradiente';
import Botao from '../../componentes/Botao/Botao';
import SliderFilmes from '../../componentes/SliderFilmes/SliderFilmes';
import Footer from '../../componentes/Footer/Footer';

function PaginaFilme() {
    // 1. CAPTURA O ID DA URL
    const { id } = useParams(); 
    
    // 2. ESTADOS DINÂMICOS
    const [filme, setFilme] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. EFEITO PARA BUSCAR DADOS DA API
    useEffect(() => {
        if (!id) return; // Não faz nada se não houver ID

        const fetchFilmeDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Requisição para buscar um filme específico: /filmes/123
                const response = await api.get(`/filmes/${id}`); 
                setFilme(response.data);
            } catch (err) {
                console.error(`Erro ao carregar filme ${id}:`, err);
                // Define uma mensagem de erro se a requisição falhar
                setError("Não foi possível carregar os detalhes do filme. Verifique o ID e a API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilmeDetails();
    }, [id]); // Roda sempre que o ID na URL muda
    
    // Assumimos que o objeto filme retornado da API é similar ao mock, 
    // mas com as propriedades: titulo, ano, duracao, diretor, sinopse, poster, banner, logo, generos (array)

    // 4. RENDERIZAÇÃO DE ESTADOS
    if (isLoading) {
        return <div className="filme-status loading-state">Carregando detalhes do filme...</div>;
    }

    if (error) {
        return <div className="filme-status error-state">Erro: {error}</div>;
    }
    
    if (!filme) {
        return <div className="filme-status not-found-state">Filme não encontrado ou o ID está incorreto.</div>;
    }

    // 5. DESESTRUTURAÇÃO (Para usar os dados da API)
    // Mapeamento dos nomes do mock para nomes mais comuns ou mantendo os do mock:
    const { 
        titulo, 
        ano, 
        duracao, 
        nota, 
        idioma, 
        diretor, 
        atores, 
        sinopse,
        imagemBannerUrl, // Tem que criar
        poster, 
        logo,
        generos 
    } = filme;
    
    const generosArray = Array.isArray(generos) ? generos : [];

    return (
        <section className="paginaFilme">
            <header>
                <Header />
            </header>
            <div 
                className='bannerIntegrado'
                style={{ backgroundImage: `url(${imagemBannerUrl})` }} 
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
                            <span>|</span>
                            <div className='nota'>
                                <StarFill size={16} color="#FFD700" />
                                <span>{nota || 'N/A'}</span>
                            </div>
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
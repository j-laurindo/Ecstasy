// PaginaFilme.jsx
import React from 'react'; 
import { StarFill, Clock, X } from 'react-bootstrap-icons'; 
import './PaginaFilme.css';
import Header from '../../componentes/Header/Header';
import CardFilme from '../../componentes/CardFilme/CardFilme';
import TituloGradiente from '../../componentes/TituloGradiente/TituloGradiente';
import Botao from '../../componentes/Botao/Botao';
import SliderFilmes from '../../componentes/ListaRecomendados/SliderFilmes';

function PaginaFilme() {
    const filme = {
        titulo: "ONCE UPON A TIME... IN HOLLYWOOD",
        ano: "2019",
        duracao: "2h 40m",
        nota: 5,
        idioma: "Inglês",
        diretor: "Quentin Tarantino",
        atores: ["Brad Pitt", "Leonardo Di Caprio", "Margot Robbie", "Margaret Qualley", "Maya Hawke", "Austin Butler"],
        sinopse: "Em 1969, Rick Dalton é um ator de TV em declínio que tenta voltar à vida de fama e sucesso em Hollywood ao lado de seu amigo e dublê, Cliff Booth. No processo, eles cruzam com muitas pessoas influentes da indústria cinematográfica, como os novos vizinhos de Rick, o casal Sharon Tate e Roman Polanski, e acabam se envolvendo involuntariamente com a infame família de Charles Manson.",
        imagemBannerUrl: 'https://static0.moviewebimages.com/wordpress/wp-content/uploads/2023/12/once-upon-a-time-in-hollywood.jpg', 
        imagemPosterCardUrl: "https://m.media-amazon.com/images/I/51o13GIxjEL.jpg",
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Once_Upon_a_Time_in_Hollywood_logo.svg/1024px-Once_Upon_a_Time_in_Hollywood_logo.svg.png',
    };

    const handleAction = (action) => console.log(action + ' clicado');


    return (
        <section className="paginaFilme">
            <header>
                <Header />
            </header>
            <div 
                className='bannerIntegrado'
                style={{ backgroundImage: `url(${filme.imagemBannerUrl})` }}
            >
                <div className='bannerOverlay'>
                    <div className='bannerContent'>
                        <img 
                            src={filme.logoUrl} 
                            alt={`Logo do filme ${filme.titulo}`} 
                            className='logoFilme' 
                        />                       
                        <div className='infoDetalhes'>
                            <span>{filme.ano}</span>
                            <span>|</span>
                            <div className='duracao'>
                                <Clock size={16} />
                                <span>{filme.duracao}</span>
                            </div>
                            <span>|</span>
                            <span className='idioma'>{filme.idioma}</span>
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
                        <CardFilme urlImagem={filme.imagemPosterCardUrl} />
                        <article className='dadoFilme'>
                            <div className='campoInfo'>
                                <h1>Diretor</h1>
                                <p>{filme.diretor}</p>
                            </div>
                            <div className='campoInfo'>
                                <h1>Atores</h1>
                                <p>{filme.atores.join(', ')}</p>
                            </div>
                            <div className='campoInfo'>
                                <h1>Sinopse</h1>
                                <p>{filme.sinopse}</p>
                            </div>
                            <div className='campoCategoria'>
                              <div className='tagCategoria'>
                                  <p>Faroeste</p>
                              </div>
                              <div className='tagCategoria'>
                                  <p>Aventura</p>
                              </div>
                              <div className='tagCategoria'>
                                  <p>Drama</p>
                              </div>
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
                    <SliderFilmes />
                </section>
            </main>
        </section>
    );
}

export default PaginaFilme;
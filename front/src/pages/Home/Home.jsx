import './Home.css';
import Header from '../../componentes/Header/Header';
import Card from '../../componentes/Card/Card';
import CardsCategoria from '../../componentes/CardsCategoria/CardsCategoria';
import TituloGradiente from '../../componentes/TituloGradiente/TituloGradiente';
import Carrossel from '../../componentes/Carrossel/Carrossel';
import SliderFilmes from '../../componentes/SliderFilmes/SliderFilmes';
import Footer from '../../componentes/Footer/Footer';

function Home() {
    return (
        <>
            <section className='paginaHome' aria-label='Página principal de home'>
                <header className='headerHome'>
                    <Header />
                    <div id="tituloHome">
                        <TituloGradiente
                        titulo1="Tudo sobre o cinema"
                        titulo2="em um só lugar"
                        descricao="Veja aqui no Ecstasy os filmes mais tops"
                    />
                    </div>
                    <section className='fileiraCard'>
                        <Card
                            titulo="Card chamativo sobre site"
                            conteudo="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
                        />
                        <Card
                            titulo="Meu nome é Julia"
                            conteudo="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"/>
                    </section>
                </header>
                <main className='conteudoHome'>
                    <section className='carrosselHome'>
                        <TituloGradiente
                        titulo1="Assista um dos filmes"
                        titulo2="mais assistidos de 2025"
                        />
                        <Carrossel />
                    </section>
                    
                    <section className='categorias'>
                        <h3>Procure suas categorias favoritas</h3>
                        <section className='fileiraCategorias'>
                            <CardsCategoria
                                categoria="AVENTURA"
                            />
                            <CardsCategoria
                                categoria="ROMANCE"
                            />
                            <CardsCategoria
                                categoria="TERROR"
                            />
                            <CardsCategoria
                                categoria="COMÉDIA"
                            />
                        </section>
                    </section>

                    <section className='fileirasFilmes'>
                        <section className='filmesHome'>
                            <SliderFilmes
                            titulo="Últimos lançamentos"
                            />

                            <SliderFilmes
                            titulo="Filmes mais assistidos em Novembro"
                            />
                        </section>
                    </section>
                </main>
                <footer>
                    <Footer />
                </footer>
            </section>
        </>
    );
}

export default Home;
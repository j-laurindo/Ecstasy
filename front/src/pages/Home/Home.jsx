import './Home.css';
import Header from '../../componentes/Header/Header';
import Card from '../../componentes/Card/Card';
import CardsCategoria from '../../componentes/CardsCategoria/CardsCategoria';
import TesteSwiper from '../../componentes/SwiperTeste/swiper';

function Home() {
    return (
        <>
            <section className='paginaHome' aria-label='Página principal de home'>
                <header className='headerHome'>
                    <Header />
                    <div className='tituloHome' aria-label='Titulo da pagina'>
                        <h1 className='titulo'>Tudo sobre o cinema</h1>
                        <h1 className='titulo'>em um só lugar</h1>
                        <p>Veja aqui no Ecstasy os filmes mais tops</p>
                    </div>
                    <div className='fileiraCard'>
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
                    </div>
                </header>
                <main className='conteudoHome'>
                    <div className='tituloHome' id='titulo2' aria-label='Titulo da pagina'>
                        <h1 className='titulo'>Assista um dos filmes</h1>
                        <h1 className='titulo'>mais assistidos de 2025</h1>
                    </div>

                    <div className='categorias'>
                        <h3>Procure suas categorias favoritas</h3>
                        <div className='fileiraCategorias'>
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
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}

export default Home;
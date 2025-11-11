import './Home.css';
import Header from '../../componentes/header/header';
import Card from '../../componentes/Card/Card';
import CardsCategoria from '../../componentes/CardsCategoria/CardsCategoria';

function Home(){
    return(
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
                        <Card />
                        <Card />
                    </div>
                </header>
                <main className='conteudoHome'>
                    <div className='tituloHome' id='titulo2' aria-label='Titulo da pagina'>
                        <h1 className='titulo'>Assista um dos filmes</h1>
                        <h1 className='titulo'>mais assistidos de 2025</h1>
                    </div>
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
                </main>
            </section>
        </>
    );
}

export default Home;
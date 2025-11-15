import './ListaFilmes.css'
import Header from '../../componentes/Header/Header';
import TituloPagina from '../../componentes/TituloPagina/TituloPagina';
import CardFilme from '../../componentes/CardFilme/CardFilme';
import Filtros from '../../componentes/Filtros/Filtros';
import BarraPesquisa from '../../componentes/BarraPesquisa/BarraPesquisa';

function ListaFilmes() {
    return (
        <>
            <header>
                <Header />
            </header>
            <main className='paginaLista'>
                <TituloPagina
                    titulo="Lista de Filmes"
                />
                <Filtros />
                <section className='filtrosLista'>

                </section>

                <section className='listaFilmes'>
                    <BarraPesquisa />
                    <div className='fileira'>
                        <CardFilme
                            titulo="O Telefone Preto"
                            ano="(2025)"
                        />

                        <CardFilme
                            titulo="Barbie 2"
                            ano="(2026)"
                        />

                        <CardFilme
                            titulo="Uma sexta feira muito louca"
                            ano="(2008)"
                        />

                        <CardFilme
                            titulo="Uma ponte para birubiru"
                            ano="(2002)"
                        />
                    </div>
                    <div className='fileira'>
                        <CardFilme
                            titulo="O Telefone Preto"
                            ano="(2025)"
                        />

                        <CardFilme
                            titulo="Barbie 2"
                            ano="(2026)"
                        />

                        <CardFilme
                            titulo="Uma sexta feira muito louca"
                            ano="(2008)"
                        />

                        <CardFilme
                            titulo="Uma ponte para birubiru"
                            ano="(2002)"
                        />
                    </div>
                    <div className='fileira'>
                        <CardFilme
                            titulo="O Telefone Preto"
                            ano="(2025)"
                        />

                        <CardFilme
                            titulo="Barbie 2"
                            ano="(2026)"
                        />

                        <CardFilme
                            titulo="Uma sexta feira muito louca"
                            ano="(2008)"
                        />

                        <CardFilme
                            titulo="Uma ponte para birubiru"
                            ano="(2002)"
                        />
                    </div>
                    <div className='fileira'>
                        <CardFilme
                            titulo="O Telefone Preto"
                            ano="(2025)"
                        />

                        <CardFilme
                            titulo="Barbie 2"
                            ano="(2026)"
                        />

                        <CardFilme
                            titulo="Uma sexta feira muito louca"
                            ano="(2008)"
                        />

                        <CardFilme
                            titulo="Uma ponte para birubiru"
                            ano="(2002)"
                        />
                    </div>
                    <div className='fileira'>
                        <CardFilme
                            titulo="O Telefone Preto"
                            ano="(2025)"
                        />

                        <CardFilme
                            titulo="Barbie 2"
                            ano="(2026)"
                        />

                        <CardFilme
                            titulo="Uma sexta feira muito louca"
                            ano="(2008)"
                        />

                        <CardFilme
                            titulo="Uma ponte para birubiru"
                            ano="(2002)"
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export default ListaFilmes;
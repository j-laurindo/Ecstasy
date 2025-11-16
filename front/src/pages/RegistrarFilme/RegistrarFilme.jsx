import './RegistrarFilme.css';
import Header from '../../componentes/Header/Header';
import FilmeForm from '../../componentes/FilmeForm/FilmeForm';
import Footer from '../../componentes/Footer/Footer';

function RegistrarFilme() {
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <section>
                    <FilmeForm
                        modo="registro" />
                </section>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default RegistrarFilme;
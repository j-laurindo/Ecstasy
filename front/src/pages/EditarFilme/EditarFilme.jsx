import './EditarFilme.css';
import Header from '../../componentes/Header/Header';
import FilmeForm from '../../componentes/FilmeForm/FilmeForm';
import Footer from '../../componentes/Footer/Footer';

function EditarFilme() {
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <section>
                    <FilmeForm
                        modo="edicao" />
                </section>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default EditarFilme;
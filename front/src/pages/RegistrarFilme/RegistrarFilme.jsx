import './RegistrarFilme.css';
import Header from '../../componentes/Header/Header';
import FilmeForm from '../../componentes/FilmeForm/FilmeForm';

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
        </>
    );
}

export default RegistrarFilme;
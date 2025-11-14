import './RegistrarFilme.css';
import Header from '../../componentes/header/header';
import FilmeForm from '../../componentes/FilmeForm/FilmeForm';

function RegistrarFilme(){
    return(
        <>
        <header>
            <Header/>
        </header>
        <main>
            <section>
                <FilmeForm 
                modo="registro"/>
            </section>
        </main>
        </>
    );
}

export default RegistrarFilme;
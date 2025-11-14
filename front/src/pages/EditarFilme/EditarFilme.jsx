import './EditarFilme.css';
import Header from '../../componentes/Header/header';
import FilmeForm from '../../componentes/FilmeForm/FilmeForm';

function EditarFilme(){
    return(
        <>
        <header>
            <Header/>
        </header>
        <main>
            <section>
                <FilmeForm 
                modo="edicao"/>
            </section>
        </main>
        </>
    );
}

export default EditarFilme;
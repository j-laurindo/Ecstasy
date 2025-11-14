import './Cadastro.css';
import Header from '../../componentes/header/header';
import Form from '../../componentes/Form/Form';

function Cadastro(){
    return(
        <>
        <header>
            <Header />  
        </header>
        <main className='paginaCadastro'>
            <Form 
            tipo="cadastro"/>
        </main>
        </>
    );
}

export default Cadastro;
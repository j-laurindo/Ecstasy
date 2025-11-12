import './Login.css';
import Header from '../../componentes/header/header';
import Form from '../../componentes/Form/Form';

function Login(){
    return(
        <>
        <header>
            <Header />  
        </header>
        <main className='paginaLogin'>
            <Form 
            tipo="login"/>
        </main>
        </>
    );
}

export default Login;


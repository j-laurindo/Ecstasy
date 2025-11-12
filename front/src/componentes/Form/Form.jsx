import './Form.css';

function Form({tipo}){
    return(
        <>
        { tipo == 'login' ? (
            <section className='form' aria-label='Formulario de Login'>
                <form className='formAzul'>
                    <div className='tituloFormulario'>
                        <h1>Login</h1>
                        <p>Seja bem vindo ao Ecstasy!</p>
                    </div>
                    <div className='inputForm' aria-label='Campo de email'>
                        <label>Email:</label>
                        <input type='email' placeholder='Digite seu email' aria-label='Campo de email'></input>
                    </div>
                    <div className='inputForm' aria-label='Campo de senha'>
                        <label>Senha:</label>
                        <input type='password' placeholder='Digite sua senha' aria-label='Campo de senha'></input>
                    </div>
                    <button type='submit' aria-label='Botão de entrar na conta'>Entrar</button>
                    <p>Não tem uma conta? <a href='https://m.media-amazon.com/images/M/MV5BZDE2ZjIxYzUtZTJjYS00OWQ0LTk2NGEtMDliYmI3MzMwYjhkXkEyXkFqcGdeQWFsZWxvZw@@._V1_.jpg'>Cadastre-se</a></p>
                </form>
            </section>
        ) : (
            <section className='form' aria-label='formulario'>
                <form className='formAzul'>
                    <div className='tituloFormulario'>
                        <h1>Cadastro</h1>
                        <p>Cadastre-se no Ecstasy!</p>
                    </div>
                    <div className='inputForm' aria-label='Campo de email'>
                        <label>Email:</label>
                        <input type='email' placeholder='Digite seu email' aria-label='Campo de email'></input>
                    </div>
                    <div className='inputForm' aria-label='Campo de nome de usuário'>
                        <label>Nome de Usuário:</label>
                        <input type='text' placeholder='Digite seu nome' aria-label='Campo de nome de usuário'></input>
                    </div>
                    <div className='inputForm' aria-label='Campo de nome de usuário'>
                        <label>Senha:</label>
                        <input type='password' placeholder='Digite sua senha' aria-label='Campo de senha'></input>
                    </div>
                    <div className='inputForm' aria-label='Campo de nome de usuário'>
                        <label>Confirmar Senha:</label>
                        <input type='password' placeholder='Digite sua senha novamente' aria-label='Campo de confirmar senha'></input>
                    </div>
                    <button type='submit' aria-label='Botão de cadastrar'>Cadastrar</button>
                </form>
            </section>
        )}
        </>
    );
}

export default Form;
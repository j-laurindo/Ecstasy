import './Form.css';

function Form({tipo}){
    return(
        <>
        { tipo === 'login' ? (
            <section className='form' aria-label='Formulario de Login'>
                <form className='formAzul'>
                    <div className='tituloFormulario'>
                        <h1>Login</h1>
                        <p>Seja bem vindo ao Ecstasy!</p>
                    </div>
                    <div className='inputForm'>
                        <label htmlFor='emailLogin'>Email:</label>
                        <input type='email' placeholder='Digite seu email' required></input>
                    </div>
                    <div className='inputForm'>
                        <label htmlFor='senhaLogin'>Senha:</label>
                        <input type='password' placeholder='Digite sua senha' required></input>
                    </div>
                    <button type='submit' aria-label='Botão de entrar na conta'>Entrar</button>
                    <p id='linkCadastro'>Não tem uma conta? <a href='https://m.media-amazon.com/images/M/MV5BZDE2ZjIxYzUtZTJjYS00OWQ0LTk2NGEtMDliYmI3MzMwYjhkXkEyXkFqcGdeQWFsZWxvZw@@._V1_.jpg'>Cadastre-se</a></p>
                </form>
            </section>
        ) : tipo === 'cadastro' ?(
            <section className='form'>
                <form className='formAzul'>
                    <div className='tituloFormulario'>
                        <h1>Cadastro</h1>
                        <p>Cadastre-se no Ecstasy!</p>
                    </div>
                    <div className='inputForm'>
                        <label htmlFor='emailCadastro'>Email:</label>
                        <input type='email' placeholder='Digite seu email'></input>
                    </div>
                    <div className='inputForm'>
                        <label htmlFor='usernameCadastro'>Nome de Usuário:</label>
                        <input type='text' placeholder='Digite seu nome'></input>
                    </div>
                    <div className='inputForm'>
                        <label htmlFor='senhaCadastro'>Senha:</label>
                        <input type='password' placeholder='Digite sua senha'></input>
                    </div>
                    <div className='inputForm'>
                        <label htmlFor='confirmarSenha'>Confirmar Senha:</label>
                        <input type='password' placeholder='Digite sua senha novamente'></input>
                    </div>
                    <button type='submit' aria-label='Botão de cadastrar'>Cadastrar</button>
                </form>
            </section>
        ) : (
           <section className='form' aria-label='formulario'>
                <form className='formRosa'>
                    <div className='tituloFormulario'>
                        <h1>Envie uma mensagem</h1>
                        <p>Como podemos te ajudar?</p>
                    </div>
                    <div className='inputForm'>
                        <label htmlFor='nomeContato'>Nome Completo:</label>
                        <input type='text' placeholder='Digite seu nome completo'></input>
                    </div>
                    <div className='inputForm'>
                        <label htmlFor='emailContato'>Email:</label>
                        <input type='email' placeholder='Digite seu email'></input>
                    </div>
                    <div className='inputForm'>
                        <label htmlFor='mensagemContato'>Mensagem:</label>
                        <textarea name="campoMensagem" rows="8" cols="50" placeholder='Digite sua mensagem'></textarea>
                    </div>
                    <button type='submit' aria-label='Botão de cadastrar'>Enviar</button>
                </form>
            </section>
        )}
        </>
    );
}

export default Form;
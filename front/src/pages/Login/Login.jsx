import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeftCircle } from 'react-bootstrap-icons'; 
import './Login.css';
import Form from '../../componentes/Form/Form';
import { useAuth } from '../../context/AuthContext'; 

function Login() {
    const [erro, setErro] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate(); 
    const { login } = useAuth();
    
    const handleVoltar = () => {
        navigate(-1); 
    };
    
    const handleLogin = async (email, senha) => {
        setErro('');
        setIsLoading(true); 
        
        if (!email || !senha) {
            setErro("Por favor, preencha todos os campos.");
            setIsLoading(false); 
            return;
        }

        try {
            const response = await login(email, senha);

            if (response && response.success) { 
                console.log("Login Sucesso. Perfil retornado para navegação:", response.role); 
                
                setTimeout(() => {
                    if (response.role === 'admin') {
                        navigate('/admin'); 
                    } else {
                        navigate('/'); 
                    }
                    setIsLoading(false); 
                }, 50); 

            } else {
                setErro(response.error || 'Credenciais inválidas. Tente novamente.');
                setIsLoading(false); 
            }

        } catch (error) {
            const errorMessage = error.message || error;
            setErro(errorMessage || 'Falha na conexão com o servidor.');
            setIsLoading(false); 
        }
    };

    return (
        <> 
            <header className="headerLogin"> 
                <button 
                    onClick={handleVoltar} 
                    className="botaoVoltar" 
                    aria-label="Voltar para a página anterior"
                    disabled={isLoading}
                >
                    <ArrowLeftCircle size={50} color="#fff" />
                </button>
            </header>
            <main className='paginaLogin'>                                
                {isLoading && <p className='msgLoading'>Carregando...</p>}
                
                {erro && <p className='msgErro'>{erro}</p>}
                
                <Form
                    tipo="login"
                    onSubmit={handleLogin} 
                    disabled={isLoading}
                />
            </main>
        </>
    );
}

export default Login;
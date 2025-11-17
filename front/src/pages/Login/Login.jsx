import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import Form from '../../componentes/Form/Form';
import { useAuth } from '../../context/AuthContext'; 

function Login() {
    const [erro, setErro] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate(); 
    const { login } = useAuth();
    
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
        // Lembre-se de remover o <Header /> daqui, ele deve estar no Layout.jsx
        <> 
            <main className='paginaLogin'>                <h1 className="login-title">Acessar a Plataforma</h1>
                
                {isLoading && <p style={{ color: 'orange', textAlign: 'center' }}>Carregando...</p>}
                
                {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}
                
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
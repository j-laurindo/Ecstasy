import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import Header from '../../componentes/Header/Header';
import Form from '../../componentes/Form/Form';
import { authService } from '../../services/api';

function Login() {
    // Estado para armazenar mensagens de erro
    const [erro, setErro] = useState('');
    const navigate = useNavigate(); // Hook de navegação
    const handleLogin = async (email, senha) => {
        setErro(''); 
        
        if (!email || !senha) {
            setErro("Por favor, preencha todos os campos.");
            return;
        }

        try {
            // Chama a função de login que faz a requisição POST e armazena o token
            const userData = await authService.login(email, senha);

            // Lógica de Navegação (Baseada no Perfil)
            if (userData.role === 'admin') {
                navigate('/admin/dashboard'); // Redireciona para o painel do Admin
            } else {
                navigate('/home'); // Redireciona para a página inicial (usuário comum)
            }

        } catch (error) {
            // Tratamento de Erro
            // A função authService.login() lança o erro da API 
            const errorMessage = error.message || error;
            setErro(errorMessage);
        }
    };

    return (
        <>
            <header>
                <Header />
            </header>
            <main className='paginaLogin'>
                {/* Exibe mensagem de erro se houver */}
                {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}
                
                <Form
                    tipo="login"
                    // Passa a função de tratamento de login para o componente Form
                    onSubmit={handleLogin} 
                />
            </main>
        </>
    );
}

export default Login;
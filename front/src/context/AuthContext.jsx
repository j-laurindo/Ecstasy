import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Consolidação de todos os estados em um único objeto (Estado Atômico)
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        role: null,
        token: null,
    });

    // Tenta carregar o estado do localStorage na inicialização
    useEffect(() => {
        const storedToken = localStorage.getItem('filminis_token');
        const userRole = localStorage.getItem('filminis_role');

        if (storedToken && userRole) {
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            
            // Atualiza o estado consolidado
            setAuthState({
                isAuthenticated: true,
                user: { role: userRole }, 
                role: userRole,
                token: storedToken,
            });
        }
    }, []);

    const login = async (email, senha) => {
        try {
            // Chamada à API de Login
            const response = await api.post('/login', { email, senha });
            const { token, role, id } = response.data; 

            // Armazena no localStorage
            localStorage.setItem('filminis_token', token);
            localStorage.setItem('filminis_role', role);

            // Atualiza o estado global com o novo objeto (DISPARA A RE-RENDERIZAÇÃO)
            setAuthState({
                isAuthenticated: true,
                user: { id, email, role },
                role: role,
                token: token,
            });
            
            // Configura o cabeçalho da API
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Retorna o objeto de sucesso com o role para uso no Login.jsx
            return { success: true, role }; 
        } catch (error) {
            console.error("Erro na autenticação:", error);
            localStorage.removeItem('filminis_token');
            localStorage.removeItem('filminis_role');
            
            // Reseta o estado em caso de falha
            setAuthState({
                isAuthenticated: false,
                user: null,
                role: null,
                token: null,
            });

            return { 
                success: false, 
                error: error.response?.data?.message || 'Credenciais inválidas. Tente novamente.' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('filminis_token');
        localStorage.removeItem('filminis_role');
        
        delete api.defaults.headers.common['Authorization']; 

        // Reseta o estado consolidado
        setAuthState({
            isAuthenticated: false,
            user: null,
            role: null,
            token: null,
        });
    };

    const value = {
        ...authState, // Expõe as propriedades do estado consolidado
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
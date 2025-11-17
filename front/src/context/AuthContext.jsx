import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); 

    // Tenta carregar o estado do localStorage na inicialização
    useEffect(() => {
        const token = localStorage.getItem('filminis_token');
        const userRole = localStorage.getItem('filminis_role');

        if (token && userRole) {
            // Se encontrou, assume autenticado
            setIsAuthenticated(true);
            setRole(userRole);
            // Configura o token no cabeçalho da API
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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

            // Atualiza o estado global
            setIsAuthenticated(true);
            setRole(role);
            setUser({ id, email, role });
            
            return true;
        } catch (error) {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('filminis_token');
        localStorage.removeItem('filminis_role');
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
    };

    const value = {
        isAuthenticated,
        user,
        role,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
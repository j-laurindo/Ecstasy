// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// 1. Cria o Contexto
const AuthContext = createContext();

// DADOS MOCKADOS para simular os diferentes usuários
const MOCKED_USERS = {
    deslogado: { isLoggedIn: false, role: null, username: null },
    user: { isLoggedIn: true, role: 'user', username: 'João Comum' },
    admin: { isLoggedIn: true, role: 'admin', username: 'Dr. Admin' },
};

export const AuthProvider = ({ children }) => {
    // Estado inicial: Usuário Deslogado
    const [user, setUser] = useState(MOCKED_USERS.deslogado);

    /**
     * Função mockada para simular o login/logout e a troca de roles.
     * @param {string} role - 'admin', 'user', ou 'logout'
     */
    const mockLogin = (role) => {
        if (role === 'admin') {
            setUser(MOCKED_USERS.admin);
        } else if (role === 'user') {
            setUser(MOCKED_USERS.user);
        } else {
            setUser(MOCKED_USERS.deslogado); // Simula o logout
        }
    };

    return (
        <AuthContext.Provider value={{ user, mockLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

// 2. Hook Customizado para consumo (De onde o `useAuth` está vindo)
export const useAuth = () => {
    // Retorna o valor do contexto (user e mockLogin)
    return useContext(AuthContext);
};
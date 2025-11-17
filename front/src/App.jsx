import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import './App.css';

// Importações de Páginas (usando sua estrutura de pastas)
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import EditarFilme from './pages/EditarFilme/EditarFilme';
import RegistrarFilme from './pages/RegistrarFilme/RegistrarFilme';
import ListaFilmes from './pages/ListaFilmes/ListaFilmes';
import PaginaFilme from './pages/PaginaFilme/PaginaFilme';
import PaginaNotificacoes from './pages/Notificacoes/Notificacoes';
import PaginaAdmin from './pages/Admin/Admin.jsx'; 

// --- Componentes de Guarda de Rota ---
const UserRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Guarda para rotas que exigem o perfil 'admin'
const AdminRoute = ({ children }) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        // Se não logado, redireciona para o Login
        return <Navigate to="/login" replace />;
    }

    if (role !== 'admin') {
        // Se logado, mas não é admin, redireciona para a Home
        return <Navigate to="/" replace />; 
    }

    // Se tudo OK (logado e admin), renderiza a página
    return children;
};


function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* ---------------------------------------------------- */}
                    {/* 1. ROTAS PÚBLICAS (Acesso sem Login) */}
                    {/* ---------------------------------------------------- */}
                    
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/filmes" element={<ListaFilmes />} />
                    <Route path="/filme/:id" element={<PaginaFilme />} />
                    

                    {/* ---------------------------------------------------- */}
                    {/* 2. ROTAS PROTEGIDAS (USER & ADMIN - Requer Login) */}
                    {/* ---------------------------------------------------- */}

                    <Route 
                        path="/registrar" 
                        element={<UserRoute><RegistrarFilme /></UserRoute>} 
                    />
                    <Route 
                        path="/editar/:id" 
                        element={<UserRoute><EditarFilme /></UserRoute>} 
                    />

                    <Route 
                        path="/notificacoes" 
                        element={<PaginaNotificacoes />} 
                    /> 

                    {/* ---------------------------------------------------- */}
                    {/* 3. ROTAS DE ADMINISTRAÇÃO (Requer role: 'admin') */}
                    {/* ---------------------------------------------------- */}

                    <Route 
                        path="/admin" 
                        element={<AdminRoute><PaginaAdmin /></AdminRoute>} 
                    />

                    {/* ---------------------------------------------------- */}
                    {/* 4. Rota 404 */}
                    {/* ---------------------------------------------------- */}
                    <Route path="*" element={<h1>404 - Não Encontrado</h1>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
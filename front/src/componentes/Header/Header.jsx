import './Header.css';
import { Bell, PersonCircle } from 'react-bootstrap-icons'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header(){
    const { isAuthenticated, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };

    // 1. Navegação Principal (Links centrais)
    const renderNavLinks = () => {
        if (role === 'admin') {
            return (
                <ul className='menuLinks'>
                    <li>
                        <Link to="/admin">Solicitações</Link> 
                    </li>
                </ul>
            );
        }
        
        // Links do Usuário Comum
        return (
            <ul className='menuLinks'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/filmes">Lista de Filmes</Link> 
                </li>
            </ul>
        );
    };

    // 2. Controles de Autenticação (Login/Perfil/Logout)
    const renderAuthControls = () => {
        if (isAuthenticated) {
            return (
                <div className="dropdown perfil-dropdown">
                    <button className="dropbtn" aria-label='Menu de Perfil e Logout'>
                        <PersonCircle size={24} color='white' />
                    </button>
                    <div className="dropdown-content">
                        {/* Link Perfil (Comum e Admin) */}
                        <Link to="/perfil">Meu Perfil</Link> 
                        
                        {/* Link Notificações (Apenas se for usuário comum) */}
                        {role !== 'admin' && <Link to="/notificacoes">Notificações</Link>}
                        
                        {/* Botão de Logout */}
                        <button onClick={handleLogout} className="logout-button">
                            Sair
                        </button>
                    </div>
                </div>
            );
        } else {
            // Links para usuários não logados
            return (
                <div className='menuItens'>
                    <Link to="/login" className="btn-login">Login</Link>
                    <Link to="/cadastro" className="btn-cadastro">Cadastro</Link>
                </div>
            );
        }
    };
    
    // Opcional: Renderizar o ícone de notificação
    const renderNotificationIcon = () => {
        if (isAuthenticated && role !== 'admin') {
            return (
                 <li className='notification-icon'>
                     <Link to="/notificacoes" aria-label='Ir para a página de notificações'>
                         <Bell color='white' size={24}/>
                     </Link>
                 </li>
            );
        }
        return null;
    };


    return(
        <header className='menuHeader' aria-label='Menu de navegação do site'>
            <h1>
                <Link to="/">ECSTASY</Link>
            </h1>
            <nav className='menuSection'>
                
                {renderNavLinks()}
                
                <ul className='menuItens'>
                    {renderNotificationIcon()} 
                    
                    <li>
                        {renderAuthControls()}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
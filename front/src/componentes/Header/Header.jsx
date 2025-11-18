import './Header.css';
import { Bell, PersonCircle } from 'react-bootstrap-icons'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Botao from '../Botao/Botao';
import Logo from '../../assets/images/logo.png';

function Header(){
    const { isAuthenticated, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };

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

    const renderAuthControls = () => {
        if (isAuthenticated) {
            return (
                <div className="dropdown perfil-dropdown">
                    <button className="dropbtn" aria-label='Menu de Perfil e Logout'>
                        <PersonCircle size={24} color='white' />
                    </button>
                    <div className="conteudoDropdown">
                        <Link to="/perfil">Meu Perfil</Link> 
                        
                        {role !== 'admin' && <Link to="/notificacoes">Notificações</Link>}
                        
                        <button onClick={handleLogout} className="logout-button">
                            Sair
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='menuItens'>
                    <Link to="/login">
                    <Botao 
                        conteudo="Login"
                        className='azul'
                    />
                    </Link>
                </div>
            );
        }
    };
    
    const renderNotificationIcon = () => {
        if (isAuthenticated && role !== 'admin') {
            return (
                 <li className='iconeNotificacao'>
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
                <Link to="/"><img src={Logo} alt="Ecstasy Logo" className='logoHeader'/></Link>
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
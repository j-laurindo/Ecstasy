import './Header.css';
// Importe os módulos necessários
import { Bell } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header(){
    const { isAuthenticated, role, logout } = useAuth(); // Acessa o estado de Auth
    const navigate = useNavigate(); // Hook para navegação programática (ex: após logout)

    const handleLogout = () => {
        logout(); // Chama a função do AuthContext para limpar o token
        navigate('/login'); // Redireciona o usuário para a tela de login
    };

    return(
        <section className='menuHeader' aria-label='Menu de navegação do site'>
            <h1>
                <Link to="/">ECSTASY</Link>
            </h1>
            <div className='menuSection'>
                <ul className='menuLinks'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/filmes">Filmes</Link> 
                    </li>
                    {role === 'user' && (
                        <li>
                            <Link to="/notificacoes">Notificações</Link>
                        </li>
                    )}
                    {role === 'admin' && (
                        <li>
                            <Link to="/admin">Admin Dashboard</Link>
                        </li>
                    )}
                </ul>
                <ul className='menuItens'>
                    <li>
                        <Link to="/notificacoes">
                            <Bell color='white' size={10}/>
                        </Link>
                    </li>
                    <li>
                        {isAuthenticated ? (
                            // SE AUTENTICADO: Mostra perfil e botão de Logout
                            <div className='auth-controls'>
                                <Link to="/perfil">Perfil</Link> 
                                <button onClick={handleLogout} className="logout-button">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            // SE NÃO AUTENTICADO: Mostra o link de Login
                            <Link to="/login">Login</Link>
                        )}
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Header;
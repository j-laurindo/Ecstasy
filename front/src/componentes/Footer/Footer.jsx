import './Footer.css';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

function Footer() {
    return(
        <section className='footer'>
            <section className='colunaLogo'>
                <img src={Logo} alt="Logo Ecstasy" className='logoFooter' />
                <span>© 2025 Ecstasy. Todos os direitos reservados.</span>
            </section> 
            <section className='colunaLinks'>
                <div className='containerLinks'>
                    <nav className='navLinks' aria-label='Navegação de páginas do Rodapé'>
                        <h3>Páginas</h3>
                        <ul>
                            <Link to="/" className='footerLink'><li>Home</li></Link>
                            <Link to="/filmes" className='footerLink'><li>Lista de Filmes</li></Link>
                            <Link to="/login" className='footerLink'><li>Login</li></Link>
                        </ul>
                    </nav>
                </div>
                <div className='containerLinks'>
                    <nav className='navLinks' aria-label='Navegação dos termos e condições'>
                        <h3>Termos e Condições</h3>
                        <ul>
                            <li>Termos e Condições</li>
                        </ul>
                    </nav>
                </div>
                <div className='containerLinks'>
                    <nav className='navLinks' aria-label='Navegação da documentação'>
                        <h3>Documentação</h3>
                        <ul>
                            <li>(Link da Documentação)</li>
                        </ul>
                    </nav>
                </div>
            </section>
        </section>
    );
}

export default Footer;
import './Footer.css';

function Footer() {
    return(
        <section className='footer'>
            <section className='colunaLogo'>
                <h1>LOGO</h1>
                <span>© 2025 Ecstasy. Todos os direitos reservados.</span>
            </section> 
            <section className='colunaLinks'>
                <div className='containerLinks'>
                    <nav className='navLinks' aria-label='Navegação de páginas do Rodapé'>
                        <h3>Páginas</h3>
                        <ul>
                            <li>Home</li>
                            <li>Filmes</li>
                            <li>Sobre Nós</li>
                            <li>Contato</li>
                            <li>Login</li>
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
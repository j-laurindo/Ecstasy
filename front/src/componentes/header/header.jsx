import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header(){
    return(
        <>
            <section className='menuHeader' aria-label='Menu de navegação do site'>
                <h1>ECSTASY</h1>
                <div className='menuSection'>
                    <ul className='menuLinks'>
                        <li>Home</li>
                        <li>Filmes</li>
                        <li>Sobre Nós</li>
                    </ul>
                    <input 
                    type='text'
                    placeholder='Pesquise...'>
                    </input>
                    <ul className='menuItens'>
                        <li>
                            <i class="bi bi-bell"></i>
                        </li>
                        <li>
                            perfil
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Header;
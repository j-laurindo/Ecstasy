import './Header.css';
import { Bell } from 'react-bootstrap-icons';

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
                    <ul className='menuItens'>
                        <li>
                            <Bell color='white' size={10}/>
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
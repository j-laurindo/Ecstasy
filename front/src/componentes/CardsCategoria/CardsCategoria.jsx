import './CardsCategoria.css'
import { Link } from 'react-router-dom';

function CardsCategoria({categoria}){
    return(
        <Link to='/filmes' className='rotaCategoria'>
            <article className='cardCategoria'>
                <h1>{categoria}</h1>
            </article>
        </Link>
        
    );
}

export default CardsCategoria
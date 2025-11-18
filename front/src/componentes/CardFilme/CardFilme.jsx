import './CardFilme.css';
import { Link } from 'react-router-dom'; 

function CardFilme({id, urlImagem, titulo, ano}) { 
    const posterSrc = urlImagem || "https://placehold.co/200x300/333/FFF?text=Sem+Poster"; 
    
    const linkPath = `/filme/:${id}`; 

    return(
        <Link to={linkPath} className='cardLink'> 
            <article className='cardFilme'>
                <figure className='cardPoster'>
                    <img 
                        src={posterSrc} 
                        alt={`Poster do filme ${titulo}`} 
                        className='posterFilme'
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x300/333/FFF?text=Sem+Poster" }} 
                    />
                </figure>
                <div className='infoFilme'>
                    <h1>{titulo}</h1>
                    <p>{ano}</p>
                </div>
            </article>
        </Link> 
    );
}

export default CardFilme;
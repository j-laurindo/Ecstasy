import './CardFilme.css';

function CardFilme({titulo, ano, urlImagem}) {
    return(
        <article className='cardFilme'>
            <figure className='cardPoster'>
                <img src={urlImagem} alt={`Poster do filme ${titulo}`} />
            </figure>
            <div className='infoFilme'>
                <h1>{titulo}</h1>
                <p>{ano}</p>
            </div>
        </article>
    );
}

export default CardFilme;
import './CardFilme.css';

function CardFilme({titulo, ano}){
    return(
        <article className='cardFilme'>
            <figure className='cardPoster'>
                <img src='https://br.web.img2.acsta.net/img/8d/f3/8df3f4de748e61ea7311db6f8fc1d455.jpg' alt='Poster do filme [nome filme]' />
            </figure>
            <div className='infoFilme'>
                <h1>{titulo}</h1>
                <p>{ano}</p>
            </div>
        </article>
    );
}

export default CardFilme;
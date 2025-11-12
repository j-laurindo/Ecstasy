import './Card.css'

function Card({titulo, conteudo}){
    return(
        <>
            <div className='cardHome'>
                <article>
                    <h1 className='titulo'>{titulo}</h1>
                    <p>{conteudo}</p>
                </article>
            </div>
        </>
    );
}

export default Card;
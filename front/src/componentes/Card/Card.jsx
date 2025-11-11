import './Card.css'

function Card({titulo, conteudo}){
    return(
        <>
            <div className='cardHome'>
                <article>
                    <h1 className='titulo'>Card chamativo sobre o site</h1>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris </p>
                </article>
            </div>
        </>
    );
}

export default Card;
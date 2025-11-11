import './CardsCategoria.css'

function CardsCategoria({categoria}){
    return(
        <article className='cardCategoria'>
            <h1>{categoria}</h1>
        </article>
    );
}

export default CardsCategoria
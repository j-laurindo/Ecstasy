import './TituloPagina.css'

function TituloPagina({titulo, desc}){
    return(
        <section className='titulo'>
            <h1>{titulo}</h1>   
            <p>{desc}</p>
            <hr className='divisor' />
        </section>
    );
}

export default TituloPagina;
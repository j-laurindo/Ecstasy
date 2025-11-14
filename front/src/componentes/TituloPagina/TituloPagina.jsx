import './TituloPagina.css'

function TituloPagina({titulo, desc}){
    return(
        <section className='formTitulo'>
            <h1>{titulo}</h1>   
            <p>{desc}</p>
            <hr className='divisor' />
        </section>
    );
}

export default TituloPagina;
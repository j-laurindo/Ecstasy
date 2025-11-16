import './TituloGradiente.css';

function TituloGradiente({titulo1, titulo2, descricao}) {
    return(
        <div className='tituloContainer' aria-label='Titulo da pagina'>
            <h1 className='titulo'>{titulo1}</h1>
            <h1 className='titulo'>{titulo2}</h1>
            <p>{descricao}</p>
        </div>
    );
}

export default TituloGradiente;
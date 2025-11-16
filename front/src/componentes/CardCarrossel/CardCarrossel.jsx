// CardCarrossel.jsx
import React from 'react';
import './CardCarrossel.css';

function CardCarrossel({filme}) {
    return (
        <section className='cardCarrossel' aria-label='Card de filme no carrossel'>
            <figure className='posterFigure'>
                <img src={filme.posterUrl} alt={`Poster do filme ${filme.titulo}`} className='posterFilme'/>
            </figure>
            <article className='infoCardCarrossel'>
                <p className='infoFilme'>{`${filme.ano} | ${filme.categoria}`}</p>
                <h3 className='tituloFilme'>{filme.titulo}</h3>
                <hr className='divisorCarrossel' />
                <p className='sinopseFilme'>{filme.sinopse}</p>
            </article>
        </section>  
    );
}

export default CardCarrossel;
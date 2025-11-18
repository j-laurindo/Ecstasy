import React from 'react';
import './CardCarrossel.css'; // ATENÇÃO: Esta linha pode causar erro de compilação!

function CardCarrossel({ filme }) {
    const generos = filme.generos || [];
    const posterSrc = filme.poster || filme.poster; 
    const sinopse = filme.resumo || filme.sinopse; 

    return (
        <section className='cardCarrossel' aria-label='Card de filme no carrossel'>
            <figure className='posterFigure'>
                <img 
                    src={posterSrc} 
                    alt={`Poster do filme ${filme.titulo}`} 
                    className='posterFilme'
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x300/333/FFF?text=Sem+Poster" }}
                />
            </figure>
            <article className='infoCardCarrossel'>
                <p className='infoFilme'>
                    {`${filme.ano} | ${generos.join(', ')}`}
                </p>
                <h3 className='tituloFilme'>{filme.titulo}</h3>
                <hr className='divisorCarrossel' />
                <p className='sinopseFilme'>{sinopse}</p>
            </article>
        </section> 
    );
}

export default CardCarrossel;
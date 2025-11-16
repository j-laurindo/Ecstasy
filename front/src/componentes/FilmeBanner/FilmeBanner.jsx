// FilmeBanner.jsx
import React from 'react';
import { StarFill, Clock } from 'react-bootstrap-icons'; 

// O banner precisa receber os dados do filme como props
function FilmeBanner({ filme }) {
    
    // Desestruturação dos dados do filme (adaptado de sua imagem)
    const { titulo, ano, duracao, nota, idioma, imagemBannerUrl } = filme;

    // Função dummy para os botões
    const handleAction = (action) => console.log(action + ' clicado');

    return (
        // 1. CONTAINER EXTERNO: Responsável pela imagem de fundo (fundo e escurecimento)
        <div 
            className='filmeBanner' 
            style={{ backgroundImage: `url(${imagemBannerUrl})` }}
        >
            {/* 2. ÁREA DE CONTEÚDO: Garante que o texto fique centralizado e visível */}
            <div className='bannerContent'>
                
                <h1 className='tituloFilme'>{titulo}</h1>
                
                {/* 3. INFORMAÇÕES SECUNDÁRIAS */}
                <div className='infoDetalhes'>
                    <div className='nota'>
                        <StarFill size={18} color="#FFD700" />
                        <span>{nota}/5</span>
                    </div>
                    <span>|</span>
                    <span>{ano}</span>
                    <span>|</span>
                    <div className='duracao'>
                        <Clock size={16} />
                        <span>{duracao}</span>
                    </div>
                    <span>|</span>
                    <span className='idioma'>{idioma}</span>
                </div>
                
                {/* 4. BOTÕES DE AÇÃO (Baseado na sua imagem) */}
                <div className='bannerAcoes'>
                    <button className='btnRemover' onClick={() => handleAction('Remover')}>
                        <span className='closeIcon'>X</span> Remover Filme
                    </button>
                    <button className='btnEditar' onClick={() => handleAction('Editar')}>
                        Editar Filme
                    </button>
                </div>

            </div>
        </div>
    );
}

export default FilmeBanner;
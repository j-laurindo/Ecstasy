import React, { useState, useEffect } from 'react';
import api from '../../services/api'; 
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRightCircle, ArrowLeftCircle } from 'react-bootstrap-icons'; 
import CardFilme from '../CardFilme/CardFilme'; 
import './SliderFilmes.css'; 

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "-55px", top: '45%' }} 
            onClick={onClick}
        >
            <ArrowRightCircle color='var(--branco)' className='arrow-icon' /> 
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: "-55px", top: '45%' }}
            onClick={onClick}
        >
            <ArrowLeftCircle size={50} color='var(--branco)' className='arrow-icon' /> 
        </div>
    );
};

function SliderFilmes({ titulo, filterParams = {} }) {
    
    const [filmes, setFilmes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       const fetchFilmes = async () => {
          setIsLoading(true);
          setError(null);

          const params = new URLSearchParams();
          
          Object.entries(filterParams).forEach(([key, value]) => {
              if (value) { 
                  params.append(key, value);
              }
          });

          const queryString = params.toString();
          const url = `/filmes${queryString ? '?' + queryString : ''}`;
            try {
                const response = await api.get(url);
                setFilmes(response.data);
            } catch (err) {
                console.error("Erro ao carregar filmes para o slider:", err);
                setError("Não foi possível carregar os filmes. Verifique a API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilmes();
    }, [filterParams]); 
    
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "80px", 
        slidesToShow: 3, 
        speed: 500,
        nextArrow: <NextArrow />, 
        prevArrow: <PrevArrow />,
        responsive: [          
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "40px",
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "100px", 
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "50px", 
                }
            }
        ]
    };
    
    if (isLoading) {
        return <div className="SliderFilmes loading-state">Carregando {titulo.toLowerCase()}...</div>;
    }

    if (error) {
        return <div className="SliderFilmes error-state">Erro ao carregar filmes: {error}</div>;
    }
    
    if (filmes.length === 0) {
        return <div className="SliderFilmes no-results-state">Não há filmes para esta categoria.</div>;
    }
    
    return (
        <div className='SliderFilmes'> 
            <h1 className='tituloSlider'>{titulo}</h1>
            <Slider {...settings} className="carrosselSlick">
                {filmes.map((filme) => (
                    <div key={filme.id} className="slideItemWrapper">
                        <CardFilme urlImagem={filme.poster} titulo={filme.titulo} ano={filme.ano}/> 
                        <div className='info'>
                            <p className="tituloCard">{filme.titulo}</p>
                            <p className="anoCard">({filme.ano || 'Indefinido'})</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SliderFilmes;
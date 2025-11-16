// FilmesRecomendados.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRightCircle, ArrowLeftCircle } from 'react-bootstrap-icons'; 
import CardFilme from '../CardFilme/CardFilme'; 
import './SliderFilmes.css'; 

// Dados de simulação
const mockFilmes = [
    { id: 1, titulo: "O Telefone Preto 2", ano: 2025, posterUrl: 'URL_1' },
    { id: 2, titulo: "Se Não Fosse Você", ano: 2025, posterUrl: 'URL_2' },
    { id: 3, titulo: "A Meia Irmã Feia", ano: 2025, posterUrl: 'URL_3' },
    { id: 4, titulo: "Frankenstein", ano: 2025, posterUrl: 'URL_4' },
    { id: 5, titulo: "Outro Filme 1", ano: 2025, posterUrl: 'URL_5' },
    { id: 6, titulo: "O Telefone Preto 2", ano: 2025, posterUrl: 'URL_1' },
    { id: 7, titulo: "Se Não Fosse Você", ano: 2025, posterUrl: 'URL_2' },
    { id: 8, titulo: "A Meia Irmã Feia", ano: 2025, posterUrl: 'URL_3' },
    { id: 9, titulo: "Frankenstein", ano: 2025, posterUrl: 'URL_4' },
    { id: 10, titulo: "Outro Filme 1", ano: 2025, posterUrl: 'URL_5' },
];



// Componente para a Seta de Próximo
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

// Componente para a Seta Anterior
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


function SliderFilmes({titulo}) {
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
    
    return (
        <div className='SliderFilmes'> 
            <h1 className='tituloSlider'>{titulo}</h1>
            <Slider {...settings} className="carrosselSlick">
                {mockFilmes.map((filme) => (
                    <div key={filme.id} className="slideItemWrapper">
                        <CardFilme urlImagem={filme.posterUrl} />
                        <div className='info'>
                            <p className="tituloCard">{filme.titulo}</p>
                            <p className="anoCard">({filme.ano})</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SliderFilmes;
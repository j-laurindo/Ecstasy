// Carrossel.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import CardCarrossel from '../CardCarrossel/CardCarrossel';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carrossel.css'; 


const NextArrow = (props) => <div className={props.className} style={{ ...props.style, right: "100px"}} onClick={props.onClick}><ArrowRightCircle size={24} className="arrow-icon right" /></div>;
const PrevArrow = (props) => <div className={props.className} style={{ ...props.style, left: "100px"}} onClick={props.onClick}><ArrowLeftCircle size={24} className="arrow-icon left" /></div>;

const mockFilmes = [
    { id: 1, titulo: "O Telefone Preto", categoria: "Suspense", sinopse: "Pesadelos assombram Gwen, de 15 anos, enquanto ela recebe chamadas do telefone preto e tem visões perturbadoras...", posterUrl: 'https://br.web.img2.acsta.net/img/8d/f3/8df3f4de748e61ea7311db6f8fc1d455.jpg', ano: '2025' },
    { id: 2, titulo: "A Meia Irmã Feia", categoria: "Comédia, Musical", sinopse: "Dois irmãos inseparáveis descobrem uma irmã há muito perdida, resultando em caos familiar e música pop.", posterUrl: 'https://br.web.img2.acsta.net/img/8d/f3/8df3f4de748e61ea7311db6f8fc1d455.jpg', ano: '2025' },
    { id: 3, titulo: "ONCE UPON A TIME...", categoria: "Faroeste, Drama", sinopse: "Um ator de TV e seu dublê tentam fazer sucesso na indústria cinematográfica durante os assassinatos de Manson.", posterUrl: 'https://br.web.img2.acsta.net/img/8d/f3/8df3f4de748e61ea7311db6f8fc1d455.jpg', ano: '2019' },
    { id: 4, titulo: "FRANKENSTEIN", categoria: "Ficção Científica, Clássico", sinopse: "Uma reimaginação da criatura de Mary Shelley, focada na busca por identidade e aceitação em um mundo moderno.", posterUrl: 'https://br.web.img2.acsta.net/img/8d/f3/8df3f4de748e61ea7311db6f8fc1d455.jpg', ano: '2025' },
];
const TOTAL_FILMES = mockFilmes.length;

if (TOTAL_FILMES === 0) {
    console.error("mockFilmes está vazio! O carrossel não será renderizado.");
}
// --------------------------------------------------------------------------

function Carrossel() {
    const [activeIndex, setActiveIndex] = useState(0); 
    
    if (TOTAL_FILMES === 0) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Erro: Nenhuma mídia para exibir no carrossel.</div>;
    }

    const settings = {
        centerMode: true,
        infinite: true,
        slidesToShow: 1, 
        centerPadding: "22%", 
        speed: 500,
        dots: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        
        afterChange: (current) => {
            setActiveIndex(current % TOTAL_FILMES);
        },
    };

    return (
        <div className='carouselDestaqueContainer'>
            <Slider {...settings} className="sliderDestaque">
                {/* 🎯 O MAPEAMENTO CORRETO AQUI */}
                {mockFilmes.map((filme, index) => (
                    <div key={filme.id} className="slideWrapper">
                        <CardCarrossel 
                            filme={filme} 
                            isActive={index === activeIndex} 
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carrossel;
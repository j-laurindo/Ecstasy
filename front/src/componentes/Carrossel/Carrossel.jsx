import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Importa o serviço de API
import Slider from 'react-slick';
import CardCarrossel from '../CardCarrossel/CardCarrossel';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carrossel.css'; 

// Componentes de seta personalizados
const NextArrow = (props) => <div className={props.className} style={{ ...props.style, right: "100px"}} onClick={props.onClick}><ArrowRightCircle size={24} className="arrow-icon right" /></div>;
const PrevArrow = (props) => <div className={props.className} style={{ ...props.style, left: "100px"}} onClick={props.onClick}><ArrowLeftCircle size={24} className="arrow-icon left" /></div>;


function Carrossel() {
    // 1. Estados para os filmes e o status de carregamento
    const [filmes, setFilmes] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Variáveis de filtro fixas para o carrossel de destaque
    const ANO_DESTAQUE = 2025;
    const LIMITE_FILMES = 5;

    // 2. Efeito para buscar os dados ao montar o componente
    useEffect(() => {
        const fetchFilmesDestaque = async () => {
            setIsLoading(true);
            setError(null);

            const url = `/filmes?ano=${ANO_DESTAQUE}&limit=${LIMITE_FILMES}`;
            
            try {
                const response = await api.get(url);
                
                const filmesLimitados = response.data.slice(0, LIMITE_FILMES); 
                
                setFilmes(filmesLimitados);
            } catch (err) {
                console.error("Erro ao carregar filmes para o Carrossel:", err);
                setError("Não foi possível carregar os filmes em destaque.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilmesDestaque();
    }, []); 

    const TOTAL_FILMES = filmes.length;

    if (isLoading) {
        return <div className="carouselDestaqueContainer loading-state">Carregando {LIMITE_FILMES} filmes de {ANO_DESTAQUE}...</div>;
    }

    if (error) {
        return <div className="carouselDestaqueContainer error-state" style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Erro: {error}</div>;
    }

    if (TOTAL_FILMES === 0) {
        return <div className="carouselDestaqueContainer no-results-state" style={{ textAlign: 'center', padding: '50px' }}>Nenhum filme de {ANO_DESTAQUE} encontrado para destaque.</div>;
    }


    // 4. Configurações do Slider (usando o TOTAL_FILMES do estado)
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
                {filmes.map((filme, index) => (
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
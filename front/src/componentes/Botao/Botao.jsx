import './Botao.css';
import { X } from 'react-bootstrap-icons';

function Botao({ conteudo, onClick, ariaLabel, className = '' }) {
    return (
        className === 'azul' ? (
            <button 
                className={`botao ${className}`} 
                onClick={onClick} 
                aria-label={ariaLabel}
            >
                {conteudo}
            </button>
        ) : (
            <button 
                className={`botao ${className}`} 
                onClick={onClick} 
                aria-label={ariaLabel}            
            >
                <X size={20}/>
                {conteudo}
            </button>
        )
    );
}

export default Botao;
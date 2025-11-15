// UrlInput.jsx
import React, { useState } from 'react';
import { Search } from 'react-bootstrap-icons';
import './URLInput.css'

// Este componente gerencia o estado da sua própria visibilidade e do input de texto
function UrlInput({ labelText, onSave, buttonText, initialVisibility = false }) {
    const [isInputVisible, setIsInputVisible] = useState(initialVisibility);
    const [urlInput, setUrlInput] = useState('');

    // Função que apenas alterna a visibilidade (mostrar/esconder)
    const toggleInput = () => {
        setIsInputVisible(!isInputVisible);
        // Limpar o input se estiver fechando
        if (isInputVisible) {
            setUrlInput('');
        }
    };

    // Função que salva o URL e esconde o campo
    const handleSave = () => {
        const url = urlInput.trim();
        if (url !== '') {
            // Chama a função 'onSave' passada pelo componente pai
            onSave(url); 
            // Esconde o campo e limpa o estado local
            setIsInputVisible(false);
            setUrlInput('');
        }
    };

    return (
        <div className='urlInputContainer'>
            <button 
                type='button' 
                onClick={toggleInput}
            >
                {buttonText}
            </button>
            
            {isInputVisible && (
                <div className='urlInput'>
                    <hr className='divisor'/>
                    <label>{labelText}</label>
                    <div className='linhaUrl'>
                        <input
                            type='text'
                            placeholder='Digite a URL da imagem'
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        />
                        <button 
                            type='button' 
                            onClick={handleSave}
                            className='searchButton'
                        >
                            <Search size={25} color='white' />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UrlInput;
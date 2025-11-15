// DropdownFiltro.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, X } from 'react-bootstrap-icons'; 
import './DropdownFiltro.css'; 

function DropdownFiltro({ titulo, opcoes, itensSelecionados, onSelectionChange }) {
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (item) => {
        let newSelection;
        
        if (itensSelecionados.includes(item)) {
            newSelection = itensSelecionados.filter(i => i !== item);
        } else {
            newSelection = [...itensSelecionados, item];
        }
        onSelectionChange(newSelection);
    };
    
    const getButtonText = () => {
        if (itensSelecionados.length === 0) {
            return titulo;
        }
        if (itensSelecionados.length === opcoes.length) {
            return `${titulo} (Todos)`;
        }
        return `${titulo} (${itensSelecionados.length})`;
    };
    

    return (
        <div className='dropdownFiltro' ref={dropdownRef}>
            <button 
                className={`botaoFiltro ${isOpen ? 'active' : ''}`} 
                onClick={toggleDropdown}
                type='button'
            >
                {getButtonText()}
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {isOpen && (
                <div className='filtro'>
                    {/* Opção para limpar a seleção */}
                    <div className='opcaoLimpar' onClick={() => onSelectionChange([])}>
                        <X size={16} /> Limpar Seleção
                    </div>
                    
                    {/* Lista de checkboxes */}
                    {opcoes.map((item, index) => (
                        <div key={index} className='filtroOpcao'>
                            <input
                                type='checkbox'
                                id={`${titulo}-${item}`}
                                checked={itensSelecionados.includes(item)}
                                onChange={() => handleCheckboxChange(item)}
                            />
                            <label htmlFor={`${titulo}-${item}`}>{item}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownFiltro;
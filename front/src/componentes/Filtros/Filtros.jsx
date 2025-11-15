// Filtros.jsx
import './Filtros.css';
import DropdownFiltro from '../DropdownFiltro/DropdownFiltro';
import { useState } from 'react';

function Filtros(){
    const anosDisponiveis = ['2024', '2023', '2022', '2021', '2020'];
    const diretoresDisponiveis = ['Tarantino', 'Nolan', 'Greta Gerwig', 'Walter Salles'];
    const atoresDisponiveis = ['Brad Pitt', 'Margot Robbie', 'Leonardo DiCaprio', 'Tom Hanks'];
    const linguagensDisponiveis = ['Português', 'Inglês', 'Espanhol', 'Japonês'];
    const generosDisponiveis = ['Ação', 'Comédia', 'Drama', 'Ficção Científica', 'Terror'];

    const [selectedAnos, setSelectedAnos] = useState([]);
    const [selectedDiretores, setSelectedDiretores] = useState([]);
    const [selectedAtores, setSelectedAtores] = useState([]);
    const [selectedLinguagens, setSelectedLinguagens] = useState([]);
    const [selectedGeneros, setSelectedGeneros] = useState([]);


    return(
        <>
            <section className='containerFiltros'>
             <div className='buttonsFiltro'>
                <p>Filtre por:</p>
                    
                    {/* FILTRO DE ANO */}
                    <DropdownFiltro
                        titulo="Ano"
                        opcoes={anosDisponiveis}
                        itensSelecionados={selectedAnos}
                        onSelectionChange={setSelectedAnos}
                    />

                    {/* FILTRO DE DIRETOR */}
                    <DropdownFiltro
                        titulo="Diretor"
                        opcoes={diretoresDisponiveis}
                        itensSelecionados={selectedDiretores}
                        onSelectionChange={setSelectedDiretores}
                    />

                    {/* FILTRO DE ATOR */}
                    <DropdownFiltro
                        titulo="Ator"
                        opcoes={atoresDisponiveis}
                        itensSelecionados={selectedAtores}
                        onSelectionChange={setSelectedAtores}
                    />

                    {/* FILTRO DE LINGUAGEM */}
                    <DropdownFiltro
                        titulo="Linguagem"
                        opcoes={linguagensDisponiveis}
                        itensSelecionados={selectedLinguagens}
                        onSelectionChange={setSelectedLinguagens}
                    />
                    
                    {/* FILTRO DE GÊNERO */}
                    <DropdownFiltro
                        titulo="Gênero"
                        opcoes={generosDisponiveis}
                        itensSelecionados={selectedGeneros}
                        onSelectionChange={setSelectedGeneros}
                    />
                    
                </div>
            </section>
        </>
    );
}

export default Filtros;
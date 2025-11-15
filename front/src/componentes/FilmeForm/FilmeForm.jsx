import './FilmeForm.css';
import { PlusCircle, X, Search } from 'react-bootstrap-icons'; // Importei o Search
import TituloPagina from '../TituloPagina/TituloPagina';
import UrlInput from '../URLInput/URLInput';
import { useState } from 'react';

function FilmeForm({ modo }) {
    // FALTA:
    // -> Puxar as informações nos inputs de edição
    const isEdit = modo === "edicao";

    // --- ESTADOS PARA AS TAGS (EXISTENTES) ---
    const [atorInput, setAtorInput] = useState('');
    const [atores, setAtores] = useState([]);
    const [categoriaInput, setCategoriaInput] = useState('');
    const [categorias, setCategorias] = useState([]);

    // --- ESTADOS POSTER ---
    const [currentPosterUrl, setCurrentPosterUrl] = useState('url-inicial-poster');
    const [currentLogoUrl, setCurrentLogoUrl] = useState('url-inicial-logo'); // Novo estado para o Logo

    // Funções de salvamento (elas apenas atualizam o estado final)
    const handleSavePosterUrl = (url) => {
        setCurrentPosterUrl(url);
    };

    const handleSaveLogoUrl = (url) => {
        setCurrentLogoUrl(url);
    };

    // --- FUNÇÕES HANDLER PARA ATORES (EXISTENTES) ---
    const handleAddAtor = () => {
        const newAtor = atorInput.trim();
        if (newAtor !== '' && !atores.includes(newAtor)) {
            setAtores([...atores, newAtor]);
            setAtorInput('');
        }
    };

    const handleRemoveAtor = (indexToRemove) => {
        setAtores(atores.filter((_, index) => index !== indexToRemove));
    };

    const handleAtorKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddAtor();
        }
    };

    // --- FUNÇÕES HANDLER PARA CATEGORIAS (EXISTENTES) ---
    const handleAddCategoria = () => {
        const newCategoria = categoriaInput.trim();
        if (newCategoria !== '' && !categorias.includes(newCategoria)) {
            setCategorias([...categorias, newCategoria]);
            setCategoriaInput('');
        }
    };

    const handleRemoveCategoria = (indexToRemove) => {
        setCategorias(categorias.filter((_, index) => index !== indexToRemove));
    };

    const handleCategoriaKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCategoria();
        }
    };

    return (
        <>
            <section className='sectionForm'>
                <TituloPagina
                    titulo={isEdit ? "Editar Filme" : "Registrar Filme"}
                    desc={isEdit ?
                        "Aqui você pode editar as informações do filme, mas as alterações só serão realizadas após a aprovação do administrador." :
                        "Aqui você pode registrar um novo filme no Ecstasy, mas o registro só será realizado após a aprovação do administrador."}
                />

                <section className='containerForm'>
                    <section className='itensLateral'>
                        <article className='itemPoster'>
                            <label htmlFor='figurePoster'>Poster do filme:</label>
                            <figure className='formPoster'>
                                <img src={currentPosterUrl} alt='Poster do filme'></img>
                            </figure>
                            <UrlInput
                                labelText="Digite o endereço da imagem e cole aqui:"
                                onSave={handleSavePosterUrl}
                                buttonText={isEdit ? "Alterar Foto" : "Adicionar Foto"}
                            />
                        </article>
                        <article className='itemLogo'>
                            <label htmlFor='figureLogo'>Logo do filme:</label>
                            <figure className='formLogo' id='logo'>
                                <img src={currentLogoUrl} alt='Poster do filme'></img>
                                
                            </figure>
                            <UrlInput 
                                labelText="Digite o endereço da logo e cole aqui:"
                                onSave={handleSaveLogoUrl}
                                buttonText={isEdit ? "Alterar Logo" : "Adicionar Logo"}
                            />
                        </article>
                    </section>

                    <form className='filmeForm'>
                        <div className='inputForm'>
                            <label>Nome do filme:</label>
                            <input
                                type='text'
                                placeholder='Ex: Titanic'
                                name='titulo'
                                required
                            />
                        </div>
                        <div className='inputForm'>
                            <label>Diretor:</label>
                            <input
                                type='text'
                                placeholder='Ex: Walter Salles'
                                name='diretor'
                                required
                            />
                        </div>
                        <div id='linha'>
                            <div className='inputForm'>
                                <label>Ano:</label>
                                <input
                                    type='text'
                                    placeholder='Ex: 2025'
                                    name='anoLancamento'
                                    required
                                />
                            </div>
                            <div className='inputForm'>
                                <label>Duração:</label>
                                <input
                                    type='text'
                                    placeholder='Ex: 2h30m'
                                    name='duracao'
                                    required
                                />
                            </div>
                        </div>
                        <div className='inputForm'>
                            <label>Linguagem:</label>
                            <input
                                type='text'
                                placeholder='Ex: Português'
                                name='linguagem'
                                required
                            />
                        </div>
                        <div className='inputForm'>
                            <label>Sinopse:</label>
                            <textarea
                                placeholder='Digite a sinopse do filme'
                                name='sinopse'
                                rows='5'
                            />
                        </div>

                        {/* --- CAMPO ATORES --- */}
                        <div className='inputForm'>
                            <label>Atores:</label>
                            <div className='lineSelect'>
                                <input
                                    type='text'
                                    name='atores'
                                    placeholder='Digite o nome de um(a) ator'
                                    value={atorInput}
                                    onChange={(e) => setAtorInput(e.target.value)}
                                    onKeyDown={handleAtorKeyDown}

                                />
                                <button
                                    type='button'
                                    className='addButton'
                                    onClick={handleAddAtor}
                                >
                                    <PlusCircle
                                        size={30}
                                        color='white'
                                    />
                                </button>
                            </div>
                            {/* Lista de tags de Atores */}
                            <div className='listaTags'>
                                {atores.map((ator, index) => (
                                    <div key={index} className='itemTag'>
                                        <span>{ator}</span>
                                        <button
                                            type='button'
                                            className='removeTag'
                                            onClick={() => handleRemoveAtor(index)}
                                        >
                                            <X color='white' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- CAMPO CATEGORIAS --- */}
                        <div className='inputForm'>
                            <label>Categorias:</label>
                            <div className='lineSelect'>
                                <input
                                    type='text'
                                    name='categorias'
                                    placeholder='Digite o nome de uma categoria'
                                    value={categoriaInput}
                                    onChange={(e) => setCategoriaInput(e.target.value)}
                                    onKeyDown={handleCategoriaKeyDown}

                                />
                                <button
                                    type='button'
                                    className='addButton'
                                    onClick={handleAddCategoria}
                                >
                                    <PlusCircle
                                        size={30}
                                        color='white'
                                    />
                                </button>
                            </div>
                            {/* Lista de tags de Categorias */}
                            <div className='listaTags'>
                                {categorias.map((categoria, index) => (
                                    <div key={index} className='itemTag'>
                                        <span>{categoria}</span>
                                        <button
                                            type='button'
                                            className='removeTag'
                                            onClick={() => handleRemoveCategoria(index)}
                                        >
                                            <X color='white' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type='submit' aria-label='Botão de enviar' className='botaoEnivar'>{isEdit ? "Solicitar Edição" : "Solicitar Filme"}</button>
                    </form>

                </section>
            </section>
        </>
    );
}

export default FilmeForm;
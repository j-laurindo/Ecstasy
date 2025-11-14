import './FilmeForm.css';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useState } from "react";

const animatedComponents = makeAnimated();

function FilmeForm({modo}){
    // NÃO FUNCIONA
    const isEdit = modo === "edicao";

    return(
        <>
        <section className='sectionForm'>
            <section className='formTitulo'>
                <h1>{isEdit ? "Editar Filme" : "Registrar Filme"}</h1>
                <p>{isEdit ? 
                "Aqui você pode editar as informações do filme, mas as alterações só serão realizadas após a aprovação do administrador." : 
                "Aqui você pode registrar um novo filme no Ecstasy, mas o registro só será realizado após a aprovação do administrador."}</p>
                <hr className='divisor' />
            </section>
            
            <section className='containerForm'>
                <section className='itensLateral'>
                    <article className='itemPoster'>
                        <label htmlFor='figurePoster'>Poster do filme:</label>
                        <figure className='formPoster'>
                            <img src='https://image.tmdb.org/t/p/original/wfgderTdoZztfYYJmXJAeqJrdqG.jpg' alt='Poster do filme'></img>
                            <button type='submit'>{isEdit ? "Alterar Foto" : "Adicionar Foto"}</button>
                        </figure>
                    </article>
                    <article className='itemLogo'>
                        <label htmlFor='figureLogo'>Logo do filme:</label>
                        <figure className='formLogo'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Once_Upon_a_Time_in_Hollywood_logo.svg/1024px-Once_Upon_a_Time_in_Hollywood_logo.svg.png' alt='Poster do filme'></img>
                            <button type='submit'>{isEdit ? "Alterar Logo" : "Adicionar Logo"}</button>
                        </figure>
                    </article>
                </section>
                
                <form className='filmeForm'>
                    <div className='inputForm'>
                        <label>Nome do filme:</label>
                        <input 
                            type='text' 
                            placeholder='Ex: Titanic' 
                            required 
                        />
                    </div>
                    <div className='inputForm'>
                        <label>Diretor:</label>
                        <input 
                            type='text' 
                            placeholder='Ex: Walter Salles' 
                            required 
                        />
                    </div>
                    <div id='linha'>
                        <div className='inputForm'>
                            <label>Ano:</label>
                            <input 
                                type='text'
                                placeholder='Ex: 2025' 
                                required 
                            />
                        </div>
                        <div className='inputForm'>
                            <label>Duração:</label>
                            <input 
                                type='text' 
                                placeholder='Ex: 2h30m' 
                                required 
                            />
                        </div>
                    </div>
                    <div className='inputForm'>
                        <label>Linguagem:</label>
                        <input 
                            type='text' 
                            placeholder='Ex: Português' 
                            required 
                        />
                    </div>
                    <div className='inputForm'>
                        <label>Sinopse:</label>
                        <textarea 
                            placeholder='Digite a sinopse do filme'
                            rows='5' 
                        />
                    </div>
                    <button type='submit' aria-label='Botão de enviar'>{isEdit ? "Solicitar Edição" : "Solicitar Filme"}</button>
                </form>
            </section>
        </section>
        </>
    );
}

export default FilmeForm;

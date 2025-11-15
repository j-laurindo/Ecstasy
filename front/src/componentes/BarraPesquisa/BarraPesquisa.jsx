import './BarraPesquisa.css';
import { Search } from 'react-bootstrap-icons'; // Importe o ícone desejado

function BarraPesquisa(){
    return(
        <div className='containerPesquisa'> 
            <input 
                type='text'
                className='barraPesquisa'
                placeholder='Pesquise por titulo, ator, ano entre outras categorias'
            />
            <Search size={20} className='iconeBusca' /> 
        </div>      
    );
}

export default BarraPesquisa;
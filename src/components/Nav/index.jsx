import { useContext } from "react";
import { AuthContext } from '../../context/auth'

import { Link } from 'react-router-dom'

import { BsBoxArrowInRight, BsPersonCheck, BsTable } from "react-icons/bs";

const Navegation = () => {
    
    const { sigOut } = useContext(AuthContext)
    
    return(      
           <div className='containerController'>
               <h3>Sua Area de Trabalho</h3>

                <div className='containerBox'>
                    <div className="boxName">
                        E
                    </div>
                    <h2>Evanilson</h2>
                </div>

                <div className='menu'>
                    <button className='btnMenu ativo'>Quadro <BsTable className='icons' size={24}/></button>
                    <Link to='/profile' className='btnMenu' >Perfil <BsPersonCheck className='icons' size={24}/></Link>
                    <button className='btnMenu' onClick={sigOut} > Sair <BsBoxArrowInRight className='icons' size={24}/></button>
                </div>
           </div>
    )
}

export default Navegation
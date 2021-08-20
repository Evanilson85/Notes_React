import { useContext, useEffect } from "react";
import { AuthContext } from '../../context/auth'

import { Link, useLocation} from 'react-router-dom'

import { BsBoxArrowInRight, BsPersonCheck, BsTable } from "react-icons/bs";

const Navegation = () => {
    
    const { sigOut, user } = useContext(AuthContext)
    let { pathname } = useLocation()

    return(      
           <div className='containerController'>
               <h3>Sua Area de Trabalho</h3>

                <div className='containerBox'>
                    <div className="boxName">
                        { user.name.split('')[0] }
                    </div>
                    <h2>{ user.name }</h2>
                </div>

                <div className='menu'>
                    <Link to='/home' className={pathname === '/home' ? 'btnMenu ativo' : 'btnMenu'} >Quadro <BsTable className='icons' size={24}/></Link>
                    <Link to='/profile' className={pathname === '/profile' ? 'btnMenu ativo' : 'btnMenu'} >Perfil <BsPersonCheck className='icons' size={24}/></Link>
                    <button className='btnMenu' onClick={sigOut} > Sair <BsBoxArrowInRight className='icons' size={24}/></button>
                </div>
           </div>
    )
}

export default Navegation
import './login.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth'

import { toast } from 'react-toastify'
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import logo from './../../assets/iconLogin.png'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useContext(AuthContext)

    const submitLogin = (event) => {
        event.preventDefault()

        if(email && password) {
            login(email, password)
        } else {
            toast.error('Todos os campos são obrigatorios!')
        }
    }

    return (
        <div className='containerForm'>
           <div className='div'>
               <img src={logo} alt="Logo" />
               <h1>myNotes</h1>
           </div>
           <form onSubmit={submitLogin} className='form'>

                <h1>Fazer Login no App</h1>

                <div>
                    <AiOutlineMail size={20} className='icons' />
                    <input type='email' placeholder='insira o e-mail' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                </div>

                <div>
                    <RiLockPasswordLine size={20} className='icons' />
                    <input type='password' placeholder='Inserir senha'  value={password} onChange={(e) => {setPassword(e.target.value)}} />
                </div>
                
                <button className='button' type='submit'>Fazer Login</button>

                <Link to='/register'>Criar Conta</Link>
           </form>
        </div>
    )
}

export default Login
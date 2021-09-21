import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import './register.css'

import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'

import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";

import logo from './../../assets/iconLogin.png'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { register } = useContext(AuthContext)

    const handleSubmit = (event) => {
        event.preventDefault()

        if(name && email && password) {
            register(name, email, password)
        }else {
            toast.error('Todos os campos são obrigatorios!')
        }

    }

    return (
        <div className='containerForm'>
           <div className='div'>
               <img src={logo} alt="Logo" />
               <h1>Notes</h1>
           </div>
           <form onSubmit={handleSubmit} action="" className='form register'>

                <h1>Fazer Cadastro no App</h1>
                <div>
                    <BsPerson size={20} className='icons' />
                    <input type='text' placeholder='Insira o nome' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                
                <div>
                    <AiOutlineMail size={20} className='icons' />
                    <input type='email' placeholder='Insira o e-mail' value={email} onChange={(e) => setEmail(e.target.value)}  />
                </div>

                <div>
                    <RiLockPasswordLine size={20} className='icons' />
                    <input type='password' placeholder='Inserir senha' value={password} onChange={(e) => setPassword(e.target.value)}  />
                </div>
                
                <button className='button' type='submit'>Criar Conta</button>

                <Link to='/'  className='button link'>Fazer Login</Link>
           </form>
        </div>
    )
}

export default Register
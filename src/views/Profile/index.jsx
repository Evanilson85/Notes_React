import './profile.css';

import { useState, useContext } from 'react'
import { AuthContext } from "../../context/auth";

import firebase from '../../service/firebaseConfig';
import { toast } from 'react-toastify';

import Header from "../../components/Header";
import Navegation from "../../components/Nav";
import Load from '../../components/Load'

import { AiOutlineMail } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

import avatar from '../../assets/images/avatar.png'

const Profile = () => {

    const { user, setUser, storageUser } = useContext(AuthContext)

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [avatarUser, setAvatarUser] = useState(user.avatarUrl)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleUpload = async () => {
        setLoading(true)
        const currentId = user.id

        await firebase.storage().ref(`profile/${currentId}/${image.name}`).put(image)
        .then( async () => {
            await firebase.storage().ref(`profile/${currentId}`)
            .child(image.name)
            .getDownloadURL()
            .then( async (url) => {
                await firebase.firestore().collection('users').doc(user.id).update({ avatarUrl: url, name: name })
                .then(() => {
                    let data = { ...user, avatarUrl: url, name: name }

                    setUser(data)
                    storageUser(data)
                    setLoading(false)
                    toast.success('Foto atualizado com Sucesso!')
                })
            })
        }).catch(err => {
            console.log(err)
            setLoading(false)
            toast.error('Ops algo deu errado!')
        })

    }

    const handleUpdate = async (event) => {

        event.preventDefault()
        setLoading(true)

        if(image === null) {
            if(name !== '') {
                await firebase.firestore().collection('users').doc(user.id).update({name: name})
                .then(() => {
    
                    let data = { ...user, name: name}
    
                    setUser(data)
                    storageUser(data)
                    toast.success('Nome atualizado com Sucesso! ')
                    setLoading(false)

                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    toast.error('Ops algo deu errado!')
                })
                
            } else {
                toast.error('O seu nome não pode ser vazio!')
                setLoading(false)
            }

        } else if (name !== '' && image !== null) {

            handleUpload()

        }
    }

    const handleFile = (event) => {

        const { files } = event.target

        if(files) {
            setImage(files[0]) // Pegar o nome do arquivo 
            setAvatarUser(URL.createObjectURL(files[0]))
        }

    }

    return(
        <>  
            <Header/>
            <main className='main'>
                <Navegation/>
                {
                    loading ? (
                        <Load/>
                    ) : (

                        <div className='profilesForms'>
                            <form className='form profiles' onSubmit={handleUpdate}>
                                <div> 
                                    <label className='label-avatar'>
                                        <input className='files' type='file' onChange={handleFile} accept='image/*'/> <br/>
                                        {avatarUser === null ?
                                            <img src={avatar} width='250' height='250' alt='foto de Perfil'/>
                                            :
                                            <img src={avatarUser} width='250' height='250' alt='foto de Perfil'/>
                                        }
                                    </label>
                                </div>

                                <div>
                                    <BsPerson size={20} className='icons' />
                                    <input type='text' placeholder='Alterar o nome' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                
                                <div>
                                    <AiOutlineMail size={20} className='icons' />
                                    <input type='email' className='disabled' disabled placeholder='e-mail' value={email} onChange={(e) => setEmail(e.target.value)}  />
                                </div>

                                <button className='button' type='submit'>Salvar</button>
                            </form>
                        </div>

                    )

                }
            </main>
        </>
    )
}

export default Profile
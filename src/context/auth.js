import { useContext, createContext, useEffect, useState } from 'react'
import firebase from '../service/firebaseConfig'

import { toast } from 'react-toastify';
export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loadAuth, setLoadAuth] = useState(false) //!cadastro
    const [load, setLoad] = useState(true)

    useEffect(() => {

        const LoadStorage = () => {

            const storageUser = localStorage.getItem('UserNotes')
    
            if(storageUser) {
                setUser(JSON.parse(storageUser))
                setLoad(false)
            }
            setLoad(false)

        }
        LoadStorage()   
    }, [])

    const login = async (email, password) => {

        setLoadAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async ({ user }) => {
            
            let id = user.uid
            let userProfile = await firebase.firestore().collection('users').doc(id).get()
            let data = {
                id: id,
                name: userProfile.data().name,
                avatarUrl: userProfile.data().avatarUrl,
                email: user.email
            }

            setUser(data)
            storageUser(data)
            setLoadAuth(false);
            toast.success(`Bem vindo de volta ${userProfile.data().name}!`)
        })
        .catch(err => {
            console.log(err)
            toast.error('Ops algo deu errado!')
            setLoadAuth(false);
        })

    }

    const register = async (name, email, password) => {

        setLoadAuth(true)

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async ({ user }) => {

            console.log(user)
            let id = user.uid
            let dataUser = {name, avatarUrl: null}

            await firebase.firestore().collection('users').doc(id).set(dataUser) //! cadastrar no meu banco com o id de auth
            .then(() => {
                let data = {
                    id: id,
                    name: name, // no banco de dados
                    email: user.email, // parte de autenticação
                    avatarUrl: null
                }

                setUser(data)
                storageUser(data)
                toast.success(`Seja Bem vindo ${name}!`)
                setLoadAuth(false)
            })
        }).catch(err => {
            console.log(err)
            toast.error('Ops algo deu errado!')
            setLoadAuth(false)
        })

    }

    const storageUser = (data) => {
        localStorage.setItem('UserNotes', JSON.stringify(data))
    }

    const sigOut = async () => {
        await firebase.auth().signOut()
        localStorage.removeItem('UserNotes')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, load, register, loadAuth, sigOut, login }}>
            { children }
        </AuthContext.Provider>
    )

}

export default AuthProvider
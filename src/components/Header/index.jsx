import { useContext } from 'react'
import { AuthContext } from '../../context/auth'

import './header.css'
import logo from '../../assets/icone.png'
import avatar from '../../assets/images/avatar.png'


const Header = () => {
    const { user } = useContext(AuthContext)

    return (
        <>
            <header>
                <div className='headerMobile'>
                    <div className='div'>
                        <img src={logo} />
                        <h1>Notes</h1>
                    </div>
                    <div className='avatarIcon'>
                        <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='avatar' />
                    </div>
                </div>
            </header>
        </>
    )

}

export default Header
import './header.css'
import logo from '../../assets/icone.png'
import avatar from '../../assets/images/avatar.png'

const Header = () => {

    return(
        <>
           <header>
               <div className='headerMobile'>
                    <div className='div'>
                        <img src={logo} />
                        <h1>myNotes</h1>
                    </div>

                    <div className='avatarIcon'>
                        <img src={avatar} alt='avatar' />
                    </div>
               </div>
           </header>
        </>
    )

}

export default Header
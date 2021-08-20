import './card.css'
import imagen from '../../assets/images/avatar.png'

const Card = ({tema, text}) => {
    return(
        <div className='box'>
            <header>
               {tema}
            </header>
          <div className='box'>
            <p> {text} </p>

            <img src={imagen} alt="" />
          </div>
        </div>
    )
}

export default Card
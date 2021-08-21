import './card.css'
import imagen from '../../assets/images/avatar.png'


const Card = ({tema, text, img}) => {


    return(
        <div className='box' >
            <header>
               {tema}
            </header>
          <div className='box'>
            <p> {text} </p>

            <img src={img === null ? imagen : img} alt="capa" />
          </div>
        </div>
    )
}

export default Card
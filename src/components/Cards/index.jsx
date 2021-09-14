import './card.css'
import imagen from '../../assets/images/avatar.png'
import { Draggable } from 'react-beautiful-dnd'

const Card = ({ item, index }) => {

	return (
		<Draggable draggableId={item.id} index={index} >

			{(providedCards, snapshot) => (
				<li
					className={snapshot.isDragging ? 'box color' : 'box'}
					ref={providedCards.innerRef}
					{...providedCards.draggableProps}
					{...providedCards.dragHandleProps}>

					<header> {item.tema} </header>
					<div className='box'>
						<p> {item.text} </p>
						<img src={item.img === null ? imagen : item.img} alt="capa" />
					</div>
					
				</li>
			)}

		</Draggable>
	)
}

export default Card

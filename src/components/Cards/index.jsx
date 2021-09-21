import './card.css'
import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd'
import { AuthContext } from '../../context/auth'
import ViewModal from '../Modal/viewModal';
import { toast } from 'react-toastify'

const Card = ({ item, index }) => {

	const { reload, createCard, openModalView } = useContext(AuthContext)
	
	const storageGet = name => {
		return localStorage.getItem(name)
	}

	const storageCreate = (name, data) => {
		localStorage.setItem(name, data)
	}

	const openCard = ({tema}) => {
		let data = storageGet('cards')
		let convertData = JSON.parse(data)
		let descrition = convertData[tema]
		openModalView({tema: descrition.tema, text: descrition.text})
	}

	const deletar = ({ id }) => {

		let data = storageGet('cards')
		let convertData = JSON.parse(data)
		delete convertData[id]
		
		let collun = storageGet('collunas')
		let convertCollun = JSON.parse(collun)
		
		Object.values(convertCollun).forEach(item => {
			item.card.forEach((i, index) => {
				if(i == id) {
				 	item.card.splice(index, 1)
					 storageCreate('cards', JSON.stringify(convertData))
					 storageCreate('collunas', JSON.stringify(convertCollun))
					
					createCard(!reload)
					toast.success('Card deletado com Sucesso!')
				}
			})
		})

	}

	return (
		<div>
		<ViewModal />
		<Draggable draggableId={item.id} index={index} >
			{(providedCards, snapshot) => (
				<li
				className={snapshot.isDragging ? 'box color' : 'box'}
				ref={providedCards.innerRef}
					{...providedCards.draggableProps}
					{...providedCards.dragHandleProps}
					>
					<header style={{background: item.color}}> {item.tema} <button className='deletes' onClick={() => {deletar(item)}}>Deletar</button> </header>
					<div className='boxContainer'>
						<p onClick={() => {openCard(item)}}> {item.text} </p>
					</div>
				</li>
			)}
		</Draggable>
		</div>
	)
}

export default Card

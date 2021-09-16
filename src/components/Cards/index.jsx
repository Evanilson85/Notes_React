import './card.css'
import React, { useContext, useState } from 'react';
import imagen from '../../assets/images/avatar.png'
import { Draggable } from 'react-beautiful-dnd'
import { AuthContext } from '../../context/auth'
import ViewModal from '../Modal/viewModal';
import { toast } from 'react-toastify'
import { message } from 'antd';
const Card = ({ item, index }) => {

	const { reload, createCard, openModalView } = useContext(AuthContext)
	// const [description, setDescription] = useState({});

        
    // const openModal = (payload) => setModal({ visible: true });
   
	const storageGet = name => {
		return localStorage.getItem(name)
	}

	const storageCreate = (name, data) => {
		localStorage.setItem(name, data)
	}

	const openCard = ({tema}) => {
		// setDescription({})
		let data = storageGet('cards')
		let convertData = JSON.parse(data)
		let descrition = convertData[tema]
		// console.log(descrition)

		openModalView({tema: descrition.tema, text: descrition.text})
	}

	const deletar = ({id, indexCollun}) => {

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
						{/* <img src={item.img === null ? imagen : item.img} alt="capa" /> */}
					
					</div>
					
				</li>
			)}

		</Draggable>
			</div>
	)
}

export default Card

import React, { useState, useContext, useEffect } from 'react';
import { MdAdd } from 'react-icons/md'
import { VscEdit } from "react-icons/vsc";
import { FaCheck } from 'react-icons/fa';
import Modal from './../Modal'
import Column from '../Column'
import Load from '../Load'
import { AuthContext } from '../../context/auth'
import { DragDropContext } from 'react-beautiful-dnd'
import './list.css'

const List = () => {

	const [titleID, setTitleID] = useState({ '1': { id: 1, edit: false }, '2': { id: 2, edit: false }, '3': { id: 3, edit: false } })
	const [titulo, setTitulo] = useState('')
	const [collum, setCollum] = useState([])
	const [cardAll, setCardAll] = useState([])
	const [buttonID, setButtonID] = useState(null)
	const { openModal, user, reload } = useContext(AuthContext)

	useEffect(() => {
		cards()
	}, [])
	
	useEffect(() => {
		cards()
	}, [reload])

	const storageCreate = (name, data) => {
		localStorage.setItem(name, data)
	}

	const storageGet = name => {
		return localStorage.getItem(name)
	}

	const create = () => {

		const colunas = {
			'1': {
				id: '1',
				title: 'Tarefas 123',
				card: []
			},
			'2': {
				id: '2',
				title: 'Tarefas em Processo',
				card: []
			},
			'3': {
				id: '3',
				title: 'Tarefas Concluidos',
				card: []
			}
		}

		let data = storageGet('collunas')
		let convert = JSON.parse(data)
		let card = []

		if (!data) {
			storageCreate('collunas', JSON.stringify(colunas))
			create()
			return
		}

		Object.values(convert).forEach(itens => {
			card.push(itens)
		})

		setCollum(card)
	}

	const cards = () => {

		let card = JSON.parse(storageGet('cards'))
		let total = {}

		if (card) {
			Object.values(card).forEach(item => {
				total[item.id] = item
			})
			setCardAll(total)
		}

		create()
	}

	const handleOnDragEnd = (result) => {

		const { destination, source, draggableId } = result

		if (!destination) return;

		if (destination.droppableId === source.droppableId && destination.index === source.index) return

		let start = collum[(source.droppableId - 1)]
		const finish = collum[(destination.droppableId - 1)]

		if (start === finish) {

			const items = Array.from(start.card);
			const [reorderedItem] = items.splice(result.source.index, 1);
			items.splice(result.destination.index, 0, reorderedItem);

			const newColumn = {
				...start,
				card: items
			}

			collum[(newColumn.id - 1)] = newColumn

			const newState = [
				...collum
			]

			setCollum(newState)
			storageUser(collum)
			return
		}

		//! mudando de list

		const startMovi = Array.from(start.card)

		startMovi.splice(result.source.index, 1)//! me retorna a minha lista onde estava sem ele
		const moviStart = { //! minha coluna sem o meu card
			...start,
			card: startMovi
		}

		let moviFinish = Array.from(finish.card)
		moviFinish.splice(destination.index, 0, draggableId)

		const newFinish = {
			...finish,
			card: moviFinish
		}

		collum[(moviStart.id - 1)] = moviStart // minha coluna atualizado sem o meu card
		collum[(newFinish.id - 1)] = newFinish

		setCollum([...collum])
		storageUser(collum)
		return

	}

	const storageUser = (data) => {
		localStorage.setItem('collunas', JSON.stringify(data))
	}

	const handleEdit = (id) => {
		setButtonID(id)
		openModal()
	}

	const handleEditTitle = (id) => {

		let editText = titleID[id].edit

		let newValue = {
			id: Number(id),
			edit: !editText
		}

		titleID[id] = newValue
		let newTitle = titleID[id]
		setTitleID({ ...titleID, newTitle })

	}

	const handleSaveTitle = (id, index) => {

		let collunsNew = []
		let indexCollum = {
			...collum[index],
			title: titulo
		}

		collum.forEach(item => {

			if (item.id === id) {
				item = indexCollum
			}

			collunsNew.push(item)
		})

		setCollum(collunsNew)
		handleEditTitle(id)
		setTitulo('')
	}

	return (
		<>
			<Modal idButton={buttonID} />
			<DragDropContext onDragEnd={handleOnDragEnd}>
				{collum && collum.map(({ id, title }, index) => {

					const colunas = collum[index]
					const cards2 = colunas.card.map((item, index) => cardAll[item])

					return (
						<div key={id} className='containerList'>
							<header>
								{
									titleID[id].edit ?
										<input type="text" placeholder='Digite o seu tema' className='edit' value={titulo} onChange={e => setTitulo(e.target.value)} />
										:
										<h2>{title}</h2>
								}
								<div style={{ display: 'flex' }}>
									{
										titleID[id].edit ?
											<button style={{ background: '#1ced03' }} onClick={() => handleSaveTitle(id, index)}><FaCheck size={24} color='#ffff' /></button>
											:
											<button onClick={() => handleEditTitle(id)}> <VscEdit size={24} color='#ffff' /> </button>
									}
									<button onClick={() => handleEdit(id)}> <MdAdd size={24} color='#ffff' /> </button>
								</div>
							</header>
							<Column key={index} colunas={id.toString()} cards={cards2} />
						</div>
					)
				})}
				{collum.length < 1 && <Load />}
			</DragDropContext>

		</>
	)
}

export default List

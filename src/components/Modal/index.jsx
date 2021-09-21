import { useContext, useState } from 'react'
import 'antd/dist/antd.css'
import { Modal as ModalComponent } from 'antd'
import { AuthContext } from '../../context/auth'
import { BsPerson } from "react-icons/bs";
import { BiMessageDots } from "react-icons/bi";
import capa from '../../assets/images/capa.jpg'
import { toast } from 'react-toastify'

const Modal = ({ idButton }) => {

	const [tema, setTema] = useState('')
	const [cardMessage, setCardMessage] = useState('')
	const [image, setImage] = useState(null)
	const [colorcard, setColorcard] = useState('')
	const [validation, setValidation] = useState(true)

	const { modal: { message, visible }, closeModal, reload, createCard } = useContext(AuthContext)

	const handleSubmit = (event) => {
	

		event.preventDefault()
	
		if (!tema || !cardMessage) {
			toast.error('Todos os campos são obrigatorios!')
			return
		}

		let card = JSON.parse(storageGet('cards'))
		let valuesTema = []

		Object.values(card).forEach(value => {
			valuesTema.push(value.tema)
		})

		if(valuesTema.includes(tema)){
			toast.error('Tema já existe!')
			return
		}

		let columns = JSON.parse(storageGet('collunas'))
		let idColluna = columns[idButton].card
		let newColumns = [...idColluna]
		let create
		let createJson = {
			id: tema,
			tema: tema,
			text: cardMessage,
			img: image,
			color: colorcard,
			indexCollun: idButton
		}

		if (card) {
			create = { ...card }
		} else {
			create = {}
		}

		createCard(!reload)

		create[createJson.id] = createJson
		
		storageCreate('cards', JSON.stringify(create))

		newColumns.push(tema)
		columns[idButton].card = newColumns
		storageCreate('collunas', JSON.stringify(columns))

		setTema('')
		setCardMessage('')
		closeModal()

		return
	
	}

	const storageGet = name => {
		return localStorage.getItem(name)
	}

	const storageCreate = (name, data) => {
		localStorage.setItem(name, data)
	}

	const color = [
		{
			cor: '#d63031',
			title: 'Urgente'
		},
		{
			cor: '#0984e3',
			title: 'Em andamento'
		},
		{
			cor: '#00b894',
			title: 'Finalizado'
		},
	]

	const changeColor = (event) => {

		let cor = event.target.style.background

		let dad = event.target.offsetParent
		let elements = dad.querySelectorAll('.radios');
		[...elements].forEach(item => {
			item.classList.remove('activo')
		})

		event.target.classList.add('activo')
		setColorcard(cor)
	}

	return (
		<ModalComponent key={idButton} footer={false} onCancel={closeModal} onOk={closeModal} visible={visible}>
			<div className='profilesForms'>
				<form className='form profiles' onSubmit={handleSubmit}>
					<div>
						<h2>Selecione a cor do seu Card</h2>
						<div className="containerRadios">
							{color.map(({cor, title}) => (
								<div className='radios ' title={title} key={cor} onClick={changeColor} style={{background: cor}} ></div>
							))}
						</div>
					</div>
					<div>
						<BiMessageDots size={20} className='icons' />
						<input type='text' placeholder='Tema' value={tema} onChange={(event) => { setTema(event.target.value) }} />
					</div>
					<div>
						<textarea 
							placeholder='Digite a sua nova Tarefa'
							cols="30" 
							rows="10" 
							value={cardMessage} 
							onChange={(event) => { setCardMessage(event.target.value) }} >
						</textarea>
					</div>
					<button className='button' type='submit'>Salvar</button>
				</form>
			</div>
		</ModalComponent>
	)
}

export default Modal
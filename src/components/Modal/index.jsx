import { useContext, useState } from 'react'
import 'antd/dist/antd.css'
import { Modal as ModalComponent } from 'antd'
import { AuthContext } from '../../context/auth'
import { BsPerson } from "react-icons/bs";
import capa from '../../assets/images/capa.jpg'
import { toast } from 'react-toastify'

const Modal = ({ idButton }) => {

	const [tema, setTema] = useState('')
	const [cardMessage, setCardMessage] = useState('')
	const [image, setImage] = useState(null)
	const [colorcard, setColorcard] = useState('')

	const { modal: { message, visible }, closeModal, reload, createCard } = useContext(AuthContext)

	const handleSubmit = (event) => {
		
		event.preventDefault()
		if (tema && cardMessage) {

			let card = JSON.parse(storageGet('cards'))
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
		
		toast.error('Todos os campos são obrigatorios!')

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
			// console.log(item)
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
						{/* <label className='label-avatar'>
							<input className='files' type='file' accept='image/*' /> <br />
							<img src={capa} style={{ width: '100%', borderRadius: 0 }} height='250' alt='foto de Perfil' />
						</label> */}
						<h2>Selecione a cor do Card</h2>
						<div className="containerRadios">
							{color.map(({cor, title}) => (
								<div className='radios ' title={title} key={cor} onClick={changeColor} style={{background: cor}} ></div>
							))}
						</div>
					</div>
					<div>
						<BsPerson size={20} className='icons' />
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
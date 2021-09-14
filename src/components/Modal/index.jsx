import { useContext, useState } from 'react'
import 'antd/dist/antd.css'
import { Modal as ModalComponent } from 'antd'
import { AuthContext } from '../../context/auth'
import { BsPerson } from "react-icons/bs";
import capa from '../../assets/images/capa.jpg'

const Modal = ({ idButton }) => {

	const [tema, setTema] = useState('')
	const [cardMessage, setCardMessage] = useState('')
	const [image, setImage] = useState(null)

	const { modal: { message, visible }, closeModal } = useContext(AuthContext)

	const handleSubmit = (event) => {

		event.preventDefault()

		let card = JSON.parse(storageGet('cardsTeste'))
		let columns = JSON.parse(storageGet('collunas'))
		let idColluna = columns[idButton].card
		let newColumns = [...idColluna]
		let create
		let createJson = {
			id: tema,
			tema: tema,
			text: cardMessage,
			img: image,
		}

		if (card) {
			create = { ...card }
		} else {
			create = {}
		}

		create[createJson.id] = createJson

		storageCreate('cardsTeste', JSON.stringify(create))

		newColumns.push(tema)
		columns[idButton].card = newColumns
		storageCreate('collunas', JSON.stringify(columns))

		setTema('')
		setCardMessage('')
		closeModal()
	}

	const storageGet = name => {
		return localStorage.getItem(name)
	}

	const storageCreate = (name, data) => {
		localStorage.setItem(name, data)
	}

	return (
		<ModalComponent key={idButton} footer={false} onCancel={closeModal} onOk={closeModal} visible={visible}>
			<div className='profilesForms'>
				<form className='form profiles' onSubmit={handleSubmit}>
					<div>
						<label className='label-avatar'>
							<input className='files' type='file' accept='image/*' /> <br />
							<img src={capa} style={{ width: '100%', borderRadius: 0 }} height='250' alt='foto de Perfil' />
						</label>
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
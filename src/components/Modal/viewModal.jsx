import React, { useContext } from 'react'
import { Modal as ModalComponent } from 'antd'
import { AuthContext } from '../../context/auth'

const Modal = () => {

    const { viewsModal: { tema, text, visible }, closeModalView } = useContext(AuthContext)

    return (
        <ModalComponent footer={false} onCancel={closeModalView} onOk={closeModalView} visible={visible}>
            <div className='profilesForms'>
                <h1> {tema} </h1>
                <p> {text} </p>
            </div>
        </ModalComponent>
    )
}

export default Modal
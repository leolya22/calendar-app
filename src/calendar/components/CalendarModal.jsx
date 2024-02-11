import { useState } from "react";
import Modal from "react-modal"


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

export const CalendarModal = () => {
    const [ isOpen, setIsOpen ] = useState( true );
    const closeModal = () => {
        setIsOpen( false );
    }

    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={ 200 }
        >
            <h1>Homa lundo!</h1>
            <hr />
            <p>Mola hundo!</p>
        </Modal>
    )
}
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import { customStyles } from '../../helpers/modal-center-style';
import './modal.css';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {

        setIsOpen(false);

    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1>holi</h1>
            <hr />
            <span>helou</span>
        </Modal>
    )
}

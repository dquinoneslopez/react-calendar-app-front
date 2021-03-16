import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { customStyles } from '../../helpers/modal-center-style';
import './modal.css';
import './date-picker.css';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActive, eventUpdated } from '../../actions/event';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus = now.clone().add(1, 'hours');

const initEvent = {
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: nowPlus.toDate()
};

export const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus.toDate());
    const [validTitle, setValidTitle] = useState(true);
    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        }
    }, [activeEvent, setFormValues]);

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

    }

    const closeModal = () => {
        dispatch(
            uiCloseModal()
        );
        dispatch(
            eventClearActive()
        );
        setFormValues(initEvent);
    }

    const handleStartDateChange = (e) => {

        // console.log(e);
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        });

    }

    const handleEndDateChange = (e) => {

        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        });

    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // console.log(formValues)
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha de fin no puede se mayor que la de inicio', 'error');
        }

        if (title.trim().length < 2) {
            return setValidTitle(false);
        }

        if (activeEvent) {
            dispatch(
                eventUpdated(formValues)
            )
        } else {
            //TODO: Realizar guardado en bd
            dispatch(
                eventAddNew({
                    ...formValues,
                    id: new Date().getTime(),
                    user: {
                        _id: 123,
                        name: 'Daniel'
                    }
                })
            );
        }

        setValidTitle(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleFormSubmit}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                        format="dd-MM-y h:mm a"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                        format="dd-MM-y h:mm a"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!validTitle && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

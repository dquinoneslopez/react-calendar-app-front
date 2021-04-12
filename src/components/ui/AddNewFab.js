import React from 'react';
import { useDispatch } from 'react-redux';

import { eventClearActive } from '../../actions/event';
import { uiOpenModal } from '../../actions/ui';

import './fab.css';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleAddNew = () => {
        dispatch(
            uiOpenModal()
        );
        dispatch(
            eventClearActive()
        );
    }

    return ( <
        button className = "btn btn-primary fab"
        onClick = { handleAddNew } >
        <
        i className = "fas fa-plus" > < /i> <
        /button>
    )
}
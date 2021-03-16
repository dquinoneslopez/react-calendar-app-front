import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/event';
import { AddNewFab } from '../ui/AddNewFab';


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    //TODO: leer eventos del store
    const { events } = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {

        // console.log(e)
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {

        // console.log(e)
        dispatch(eventSetActive(e));
        dispatch(uiOpenModal());

    }

    const onViewChange = (e) => {

        // console.log(e)
        setLastView(e);
        localStorage.setItem('lastView', e);

    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        // console.log(event, start, end, isSelected);
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block'
        }
        return { style }

    }

    return ( <
        div className = "calendar-screen" >
        <
        Navbar / >
        <
        Calendar localizer = { localizer }
        events = { events }
        startAccessor = "start"
        endAccessor = "end"
        messages = { messages }
        eventPropGetter = { eventStyleGetter }
        onDoubleClickEvent = { onDoubleClick }
        onSelectEvent = { onSelectEvent }
        onView = { onViewChange }
        view = { lastView }
        components = {
            {
                event: CalendarEvent
            }
        }
        /> <
        AddNewFab / >
        <
        CalendarModal / >

        <
        /div>
    )
}
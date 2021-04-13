import React, { useState, useEffect } from 'react';
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
import {
    eventClearActive,
    eventSetActive,
    eventStartLoading
} from '../../actions/event';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const { uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch])

    const onDoubleClick = (e) => {

        // console.log(e)
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {

        // console.log(e)
        dispatch(eventSetActive(e));

    }

    const onViewChange = (e) => {

        // console.log(e)
        setLastView(e);
        localStorage.setItem('lastView', e);

    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        // console.log(event, start, end, isSelected);
        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block'
        }
        return { style }

    }

    const onSelectSlot = (e) => {
        // console.log(e)
        dispatch(
            eventClearActive()
        )
    }

    return (
        <div
            className="calendar-screen"
        >
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={
                    {
                        event: CalendarEvent
                    }
                }
            />
            {
                (activeEvent) && <DeleteEventFab />
            }
            <AddNewFab />
            <CalendarModal />

        </div>
    )
}
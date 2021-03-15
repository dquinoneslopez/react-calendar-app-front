import React from 'react'

export const CalendarEvent = ({ event }) => {
    // console.log(event)
    const { title, name } = event;
    return (
        <div>
            <span> {title} </span>
            <strong>- {name} </strong>
        </div>
    )
}

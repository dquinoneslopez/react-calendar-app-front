import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events: [{
        title: 'Cumpleaños de alguien',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Comprar pastel',
        user: {
            _id: '123',
            name: 'Daniel'
        }
    }],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payLoad
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payLoad
                ]
            }
        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null
            }
        default:
            return state;
    }

}
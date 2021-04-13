import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types"

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();

            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(
                    eventAddNew(event)
                );
            } else {
                Swal.fire('Error', 'Could not save the event', 'error');
            }

        } catch (error) {
            Swal.fire('Error', error, 'error');
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActive = () => ({
    type: types.eventClearActive
})

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})

export const eventDeleted = () => ({
    type: types.eventDeleted
})

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            dispatch(eventLoaded(body.events));
        } catch (error) {

        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})
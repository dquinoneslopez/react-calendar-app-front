import { types } from "../types/types"

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payLoad: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payLoad: event
})

export const eventClearActive = () => ({
    type: types.eventClearActive
})

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payLoad: event
})

export const eventDeleted = () => ({
    type: types.eventDeleted
})
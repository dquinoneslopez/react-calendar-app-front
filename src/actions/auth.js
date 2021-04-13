import Swal from 'sweetalert2'

import { fetchWithToken, fetchWithoutToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from './event';

export const startLogin = (email, password) => {

    return async(dispatch) => {

        const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name
                })
            );
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }

}

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startRegister = (email, password, name) => {

    return async(dispatch) => {

        const resp = await fetchWithoutToken('auth/new', { email, password, name }, 'POST')
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name
                })
            )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name
                })
            )
        } else {
            dispatch(checkingFinished());
        }

    }
}

const checkingFinished = () => ({
    type: types.authCheckingFinished
});

export const startLogout = () => {

    return (dispatch) => {

        localStorage.clear();
        dispatch(logout());
        dispatch(eventLogout());

    }

}

const logout = () => ({
    type: types.authLogout
})
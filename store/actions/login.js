import { LOGINING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, IS_SIGNED_IN, NOT_AUTHORIZED, HANDLE_PASSWORD_CHANGE, HANDLE_EMAIL_CHANGE  } from '../constants'
import axios from 'axios';

const baseURL = 'https://polite-snail-31.localtunnel.me/'

export function registerUser(data) {
    return (dispatch) => {
        axios.post(baseURL + 'users', data)
        .then(response => {
          console.log(response)
          dispatch(login())
          dispatch(loginSuccess())
        })
        .catch(e => {
            dispatch(loginFailure())
        })

        axios.post(baseURL + 'sessions', data)
        .then(response => {
          console.log(response)
          dispatch(login())
          dispatch(loginSuccess())
        })
        .catch(e => {
            dispatch(loginFailure())
        })
    }
}

export function loginUser(data) {
    return (dispatch) => {
        axios.post(baseURL + 'sessions', data)
        .then(response => {
            console.log(response)
            dispatch(login())
            dispatch(loginSuccess())
            dispatch(isSigned())
        })
        .catch(e => {
            dispatch(loginFailure())
        })
    }
}

export function isSessionExists() {
    return (dispatch) => {
        axios.get(baseURL + 'private/whoami')
        .then(response => {
          console.log(response)
          dispatch(isSigned())
        })
        .catch(e => {
            console.log(e)
            if (e.response.status === 401) {
                dispatch(notAuthorized())
            }
        })
    }
  }

export function login() {
    return {
        type: LOGINING,
    }
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
        data
    }
}

  
export function loginFailure() {
    return {
        type: LOGIN_FAILURE,
    }
}

export function logout() {
    return {
        type: LOGOUT,
    }
}

export function isSigned() {
    return {
        type: IS_SIGNED_IN
    }
}

export function notAuthorized() {
    return {
        type: NOT_AUTHORIZED
    }
}

export function handlePasswordChange(data) {
    return {
        type: HANDLE_PASSWORD_CHANGE,
        data
    }
}

export function handleEmailChange(data) {
    return {
        type: HANDLE_EMAIL_CHANGE,
        data
    }
}
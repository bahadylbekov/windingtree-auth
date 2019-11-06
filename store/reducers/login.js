import { LOGINING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, IS_SIGNED_IN, NOT_AUTHORIZED, HANDLE_PASSWORD_CHANGE, HANDLE_EMAIL_CHANGE  } from '../constants'

const initialState = {
    email: '',
    password: '',
    encryptedPassword: '',
    user_id: '',
    errors: [],
    loading: false,
    signedIn: false,
    checkedSignIn: false,
}

export default function loginReducer (state = initialState, action) {
    switch (action.type) {
        case LOGINING:
            return {
                ...state,
                loading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                errors: true,
            }
        case LOGOUT:
            return {
                ...state,
                signedIn: false,
                checkedSignIn: true,
            }
        case IS_SIGNED_IN: 
            return {
                ...state,
                signedIn: true,
                checkedSignIn: true,
            }
        case NOT_AUTHORIZED:
            return {
                ...state,
                signedIn: false,
                checkedSignIn: true,
            }   
        case HANDLE_EMAIL_CHANGE:
                return {
                    ...state,
                    email: action.data,
                }   
        case HANDLE_PASSWORD_CHANGE:
                return {
                    ...state,
                    email: action.data,
                }                                       
        default:
            return state      
    }
}
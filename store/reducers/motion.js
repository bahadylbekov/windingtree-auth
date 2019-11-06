import { SET_X, SET_Y, SET_Z, SET_ACCELEROMETER_HISTORY, CALCULATE_BPF, SET_ACCELEROMETER_DATA  } from '../constants'

const initialState = {
    x: '',
    y: '',
    z: '',
    accelerometer: '',
    accelerometerHistory: [],
    BPF: '',
}

export default function loginReducer (state = initialState, action) {
    switch (action.type) {
        case SET_X:
            return {
                ...state,
                x: action.data,
            }
        case SET_Y:
            return {
                ...state,
                y: action.data,
            }
        case SET_Z:
            return {
                ...state,
                z: action.data,
            }
        case SET_ACCELEROMETER_HISTORY:
            return {
                ...state,
                accelerometerHistory: action.data,
            }
        case CALCULATE_BPF:
                return {
                    ...state,
                    BPF: action.data,
                }   
        case SET_ACCELEROMETER_DATA:
                return {
                    ...state,
                    accelerometer: action.data,
                }                                       
        default:
            return state      
    }
}
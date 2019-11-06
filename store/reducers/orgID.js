import { CREATE_ORG_ID_ADDRESS, CREATE_ORG_ID, CALCULATE_ORG_ID_HASH, GET_ALL_ORG_ID, GET_SELECTED_ORG_ID } from '../constants'

const initialState = {
    myOrgID_address: '',
    myOrgID_JSON: {},
    myOrgID_hash: '',
    section_orgID: [],
    orgID: {},
}

export default function loginReducer (state = initialState, action) {
    switch (action.type) {
        case CREATE_ORG_ID_ADDRESS:
            return {
                ...state,
                myOrgID_address: action.data,
            }
        case CREATE_ORG_ID:
            return {
                ...state,
                myOrgID_JSON: action.data,
            }
        case CALCULATE_ORG_ID_HASH:
            return {
                ...state,
                myOrgID_hash: action.data,
            }
        case GET_ALL_ORG_ID:
            return {
                ...state,
                section_orgID: action.data,
            }
        case GET_SELECTED_ORG_ID: 
            return {
                ...state,
                orgID: action.data,
            }
        default:
            return state      
    }
}
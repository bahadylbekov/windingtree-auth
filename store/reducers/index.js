import { combineReducers } from 'redux';
import login from './login.js'
import orgID from './orgID.js'
import motion from './motion.js'

const rootReducer = combineReducers({
    login,
    orgID,
    motion
});

export default rootReducer
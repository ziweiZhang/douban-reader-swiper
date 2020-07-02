import { combineReducers } from 'redux'
import {
    GET_LIST
} from '../actions'

const fetchListReducer = (state = { }, action) => {
    switch (action.type) {
        case GET_LIST:
        return {
            ...state,
            [action.tag]: action.list
        }
        default:
        return state
    }
}

const rootReducer = combineReducers({
    fetchListReducer,
})

export default rootReducer
import {combineReducers} from 'redux'

const initJobs = () => {

    const all = (state = [], action) => {
    switch(action.type){
        case 'GET_JOBS':
            return action.jobs
        default:
            return state
        }
    }
    return combineReducers({all})
}

const jobs = initJobs()

export default jobs
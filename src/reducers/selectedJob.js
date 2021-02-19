import {combineReducers} from 'redux'

const initJob = () => {
    const item = (state = {}, action) => {
    switch (action.type) {
        case 'GET_JOB_BY_ID':
            return action.job
        default:
            return state
        }
    }

    const isFetching = (state = false, action) => {
        switch(action.type){
            case 'REQUEST_JOB':
                return true
            case 'GET_JOB_BY_ID':
                return false
            default:
                return state
            }
        }
    return combineReducers({
        item,
        isFetching
    })
}

const selectedJob = initJob()
export default selectedJob
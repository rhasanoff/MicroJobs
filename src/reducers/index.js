import {combineReducers} from 'redux'
import jobs from './jobs'
import selectedJob from './selectedJob'
import auth from './auth'
import offers from './offers'
import collaboration from './collaboration'

const jobApp = combineReducers({
    jobs,
    selectedJob,
    auth,
    offers,
    collaboration
})

export default jobApp
import {createStore, applyMiddleware, combineReducers,compose} from 'redux'
import jobApp from 'reducers'
import thunk from 'redux-thunk'

const addPromise = store =>{
    const dispatch = store.dispatch

    return action => {
        if(typeof action.then === 'function'){
            return action.then(dispatch)
        }
        return dispatch(action)
    }
}

const initJobs = () => {
    const middlewares = [thunk]
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(jobApp, composeEnhancers(applyMiddleware(...middlewares)))
    store.dispatch = addPromise(store)
    return store
}

export default initJobs
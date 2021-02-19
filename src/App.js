import React from 'react';

import {Provider} from 'react-redux'
import initJobs from './jobs'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { ToastProvider, useToasts } from 'react-toast-notifications'
import './App.css';
import Main from './Main'
import { onAuthStateChanged, storeAuthUser, resetAuthState, subscribeToMessages, checkUserConnection } from 'actions'

const store = initJobs()

class App extends React.Component{

  componentDidMount(){
    this.unsubscribeAuth = onAuthStateChanged(authUser => {
      store.dispatch(resetAuthState())
      store.dispatch(storeAuthUser(authUser))

      if(authUser){
        checkUserConnection(authUser.uid)
        this.unsubscribeMessages = store.dispatch(subscribeToMessages(authUser.uid))
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeAuth()
    this.unsubscribeMessages()
  }

  render(){
  return (
    <Provider store={store}>
      <ToastProvider>
      <Router>
       <Main/>
      </Router>
      </ToastProvider>
    </Provider>
  )}
}
export default App;

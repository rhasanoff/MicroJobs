import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import HomePage from './pages/Home'
import FaqPage from './pages/Faq'
import ProfilePage from './pages/Profile'
import MicroJobsPage from './pages/MicroJobs'
import JobDetailPage from './pages/JobDetail'
import LoginPage from './pages/Login'
import JobCreate from './pages/JobCreate'
import RegisterPage from './pages/Register'
import UserJobs from './pages/UserJobs'
import Navbar from 'components/Navbar'
import './App.css';
import Sidebar from './components/Sidebar'
import Spinner from 'components/Spinner'
import auth from 'reducers/auth'
import { logout } from 'actions'
import SentOffers from 'pages/SentOffers'
import ReceivedOffers from 'pages/ReceivedOffers'
import ReceivedCollaborations from 'pages/ReceivedCollaborations'
import CollaborationDetail from 'pages/CollaborationDetail'

class Main extends React.Component{

    handleLogout = (uid) => this.props.dispatch(logout(uid))

    renderApp(){
        return(
        <React.Fragment>
            <Navbar 
            id="navbar-main"
            logout={() => this.handleLogout(this.props.auth.user.uid)}
            auth={this.props.auth} />
            <Navbar 
            logout={() => this.handleLogout(this.props.auth.user.uid)}
            auth={this.props.auth}
            id="navbar-clone" />
            <Sidebar />
            <Switch>
        <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/register">
            <RegisterPage/>
          </Route>
          <Route path="/collaborations/me">
            <ReceivedCollaborations/>
          </Route>
          <Route path="/collaborations/:id">
            <CollaborationDetail/>
          </Route>
          <Route path="/offers/sent">
            <SentOffers/>
          </Route>
          <Route path="/offers/received">
            <ReceivedOffers/>
          </Route>
          <Route path="/jobs/my">
            <UserJobs/>
          </Route>
          <Route path="/jobs/new">
            <JobCreate/>
          </Route>
          <Route path="/jobs/:jobId">
            <JobDetailPage/>
          </Route>
          <Route path="/jobs">
            <MicroJobsPage/>
          </Route>
          <Route path="/profile">
            <ProfilePage/>
          </Route>
          <Route path="/faq">
            <FaqPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
        </React.Fragment>
        )
    }

    render(){
        return this.props.auth.isAuthResolved ? this.renderApp() : <Spinner/>
    }
}

const mapState = state => ({auth: state.auth})

export default connect(mapState)(Main);
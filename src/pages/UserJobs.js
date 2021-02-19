import React from 'react'
import authorization from 'components/helpers/authorization'
import {getUserJobs} from 'actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import JobItem from 'components/JobItem'

class UserJobs extends React.Component{

    componentDidMount(){
        const {auth: {user}, dispatch} = this.props
        dispatch(getUserJobs(user.uid))
        debugger
    }

    render(){
        const { jobs } = this.props.auth.user
        debugger
            return (
                
            <div className="container">
                
                <div className="content-wrapper">
                    <h1 className="title">My Jobs </h1>
                    <div className="columns is-multiline">
                    {
                    jobs.map(job => {
                  return (
                  <div key={job.id} className="column is-one-third">
                    <JobItem job={job}/>
                  </div>)
                })
                }
                    </div>
                </div>
            </div>
        )
    }
}


export default authorization(UserJobs)
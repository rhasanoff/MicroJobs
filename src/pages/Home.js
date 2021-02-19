import React from 'react'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MainBanner from 'components/MainBanner'
import { getJobs } from 'actions'
import JobItem from 'components/JobItem'

class Home extends React.Component {

  state = {
    jobs: []
  }
  componentDidMount() {
    this.props.getJobs()
  }

  render() {
    const { jobs } = this.props
    return (
      <div>
        <MainBanner />

        <section className="section section-feature-grey is-medium">
          <div className="container">
            <div className="title-wrapper has-text-centered">
              <h2 className="title is-2">With Great Power </h2>
              <h3 className="subtitle is-5 is-muted">Comes Great Responsibility</h3>
              <div className="divider is-centered"></div>
            </div>

            <div className="content-wrapper">
              <div className="columns is-multiline">
                {jobs.map(job => {
                  return (
                  <div key={job.id} className="column is-one-third">
                    <JobItem job={job}/>
                  </div>)
                })
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    jobs: state.jobs.all
  }
}, {getJobs})(Home)
import React from 'react'
import {Link} from 'react-router-dom'

const JobItem = ({job, children, className, noButton}) => {
    return (
        <div
          className="column is-one-third">
          <div className={`feature-card is-bordered has-text-centered revealOnScroll delay-1 ${className}`} data-animation="fadeInLeft">
            <div className="card-title">
               <h4>{job.title}</h4>
            </div>
            <div className="card-icon">
               <img src={job.image} alt=""/>
            </div>
            <div className="card-text">
               <p>{job.description}</p>
            </div>
            {children &&
            <div className="card-text">
              {children}
            </div>
            }
            {!noButton &&
                <div className="card-action">
               <Link 
                  to={`/jobs/${job.id}`}
                  className="button btn-align-md accent-btn raised">Learn More</Link>
            </div>}
          </div>
        </div>
      )
}

export default JobItem
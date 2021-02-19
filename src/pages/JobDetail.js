import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import {getJobById, requestJob} from 'actions'
import Spinner from 'components/Spinner'
import OfferModal from 'components/OfferModal'

const JobDetail = props => {

    const  {jobId}  = useParams()
    const {dispatch, isFetching} = props
    console.log(jobId)
    useEffect(() => {
        dispatch(requestJob())
        dispatch(getJobById(jobId))
    }, [jobId,dispatch])

    const {job, auth} = props

    if( isFetching || jobId !== job.id){
        return <Spinner/>
    }

    return (
        <section class="hero is-default is-bold service-detail-page">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="columns is-vcentered">
                        <div class="column is-5">
                            <figure class="image is-4by3">
                                <img src={job.image} alt="Description" />
                            </figure>
                        </div>
                        <div class="column is-6 is-offset-1">
                        <div class="media service-user">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                <img src={job.user.avatar} alt="Placeholder image"/>
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">{job.user.fullName}</p>
                                <p class="subtitle is-6">Author</p>
                            </div>
                            </div>
                            <h1 class="title service-title is-2">
                                {job.title}
                </h1>
                <div className = "tag is-large service-category">
                    {job.category}
                </div>
                            <h2 class="subtitle is-4">
                               {job.description}
                </h2>
                <div className="subtitle">
                    ${job.price} per hour
                    </div>
                            <br />
                            <div class="has-text-centered">
                                <OfferModal auth={auth} job={job}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = ({selectedJob, auth}) => ({
    job: selectedJob.item,
    isFetching: selectedJob.isFetching,
    auth
})

export default connect(mapStateToProps)(JobDetail)
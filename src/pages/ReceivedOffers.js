import React from 'react'
import authorization from 'components/helpers/authorization'
import JobItem from 'components/JobItem'
import {getReceivedOffers, acceptOffer, declineOffer} from 'actions'
import {connect} from 'react-redux'

class ReceivedOffers extends React.Component {

    componentDidMount(){
        const {auth} = this.props
        this.props.getReceivedOffers(auth.user.uid)
    }

    acceptOffer = offerId => {
      this.props.acceptOffer(offerId)
    }
    declineOffer = offerId => {
      this.props.declineOffer(offerId)
    }
    statusColor = status => {
      if(status === 'pending') return 'is-warning'
      if(status === 'accepted') return 'is-success'
      if(status === 'declined') return 'is-danger'
    }
    render(){
        const {offers} = this.props

        return (
            <div class="container">
              <div className="content-wrapper">
                <h1 className="title">Received Offers</h1>
                { offers.length === 0 &&
            <span className="tag is-large">You don't have any received offers</span>
          }
                <div className="columns">
                    { offers.map(o =>(
                    <div key={o.id} className="column is-one-third">
                      <JobItem
                      noButton
                      className="offer-card"
                      job={o.job}>
                      <div className={`tag is-large ${this.statusColor(o.status)}`}>
                        {o.status}
                      </div>
                      <hr />
                      <div className="service-offer">
                        <div>
                          <span className="label">From User:</span> {o.fromUser.fullName}
                        </div>
                        <div>
                          <span className="label">Note:</span> {o.note}
                        </div>
                        <div>
                          <span className="label">Price:</span> ${o.price}
                        </div>
                        <div>
                          <span className="label">Time:</span> {o.time} hours
                        </div>
                      </div>
                      { o.status ==='pending' &&
                      <div>
                        <hr/>
                        <button onClick={()=>this.acceptOffer(o.id)} className="button is-success">Accept</button>
                        <button onClick={()=>this.declineOffer(o.id)} className="button is-danger">Decline</button>
                      </div>
                      }
                    </JobItem>
                     
                  </div>))
                  
                    }
                </div>
              </div>
            </div>
          )
    }
}

const mapState = (state) => {
    return {
        offers: state.offers.received
    }
}

export default authorization(connect(mapState, {acceptOffer, declineOffer,getReceivedOffers})(ReceivedOffers))

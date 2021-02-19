import React from 'react'
import authorization from 'components/helpers/authorization'
import {getSentOffers, collaborate} from 'actions'
import JobItem from 'components/JobItem'
import {newMessage, newCollaboration} from 'utils/offers'
import {connect} from 'react-redux'

class SentOffers extends React.Component {

    componentDidMount(){
        const {auth} = this.props
        this.props.dispatch(getSentOffers(auth.user.uid))
    }

    createCollaboration = (offer) => {
      const {auth: {user}} = this.props
      const collaboration = newCollaboration({offer, fromUser:user})
      const message = newMessage({offer, fromUser:user})
      this.props.collaborate({collaboration, message})
      .then(_=>alert('Collaboration was created!'))
    }

    render(){
        const {offers} = this.props
        return (
            <div class="container">
              <div className="content-wrapper">
                <h1 className="title">Sent Offers</h1>
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
                      <div className="tag is-large">
                        {o.status}
                      </div>
                      <hr />
                      <div className="service-offer">
                        <div>
                          <span className="label">To User:</span> {o.toUser.fullName}
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
                      {o.status === 'accepted' && !o.collaborationCreated &&
                      <div>
                        <hr/>
                        <button onClick={() => this.createCollaboration(o)} className="button is-success">Collaborate</button>
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
        offers: state.offers.sent
    }
}

export default authorization(connect(mapState,{collaborate})(SentOffers))
import React from 'react'
import { Link } from "react-router-dom"
import { getCollaborations } from 'actions'
import moment from 'moment'
import auth from 'reducers/auth'
import authorization from 'components/helpers/authorization'

class ReceivedCollaborations extends React.Component {

  state = {
    collaborations: []
  }

  componentDidMount(){
      const {auth: {user}} = this.props
      getCollaborations(user.uid)
        .then(collaborations => this.setState({collaborations}))
  }

  render() {
    const { collaborations } = this.state
    return (
      <div className="content-wrapper">
        <div className="container">
          <h1 className="title">Collaborations</h1>
          <div className="box content">
            { collaborations.map(c => (
              <article key={c.id} className="post">
                <h4>{c.title}</h4>
                <div className="media">
                  <div className="media-left">
                    <p className="image is-32x32">
                      <img src={c.image} alt={c.title}/>
                    </p>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <a href="#">{c.fromUser.name}</a> replied {moment(c.createdAt.toDate()).fromNow()} &nbsp;
                        <span className="tag">{c.status}</span>
                      </p>
                    </div>
                  </div>
                  <div className="media-right">
                    <span className="has-text-grey-light">
                      <Link to={`/collaborations/${c.id}`}>
                        <button className="button">Enter</button>
                      </Link>
                    </span>
                  </div>
                </div>
              </article>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default authorization(ReceivedCollaborations)
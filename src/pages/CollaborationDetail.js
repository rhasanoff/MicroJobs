import React from 'react'
import { connect } from 'react-redux'
import authorization from 'components/helpers/authorization';
import {withRouter} from 'react-router-dom'
import { subToCollaboration, startCollaboration, checkMessages, joinCollaboration, subToProfile, leaveCollaboration,sendChatMessage} from 'actions'
import JoinedPeople from 'components/JoinedPeople'
import moment from 'moment'
import {Timestamp} from 'database'
import Timer from 'components/Timer'
import ChatMessages from 'components/ChatMessages'
import Spinner from 'components/Spinner'
class CollaborationDetail extends React.Component {

  state = {
    inputValue: '',
    reload: false
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const {user} = this.props.auth
    joinCollaboration(id, user.uid)
    this.watchCollab(id)
    this.watchMessages(id)
  }
  watchCollab = id => {
    this.unsubscribeFromCollab = this.props.subToCollaboration(id,
      ({joinedPeople}) => {
        this.watchJoinedPeople(joinedPeople.map(p => p.id))
      })
    }
  watchJoinedPeople =ids => {
    this.peopleWatchers = {}
    ids.forEach(id => {
      this.peopleWatchers[id] = this.props.subToProfile(id)
    })
  }

  watchMessages = (collabId) => {
   this.unsubscribeFromMessages = this.props.checkMessages(collabId)
  }

  onKeyboardPress = e => {
    if (e.key === 'Enter') {this.SendMessage(this.state.inputValue)}
  }

  SendMessage = inputValue => {
    if(inputValue.trim() === '') {return}
    const timestamp = moment().valueOf().toString()
    const {user} = this.props.auth
    const {collaboration} = this.props

    const message = {
      user: {
        uid: user.uid,
        avatar: user.avatar,
        name: user.fullName
      },
      timestamp: parseInt(timestamp, 10),
      content: inputValue.trim()
    }

    sendChatMessage({message, collabId: collaboration.id, timestamp})
      .then(_=> this.setState({inputValue: ''}))
  }

  onStartCollaboration = (collaboration) => {
    const {id, time} = collaboration
    const newSeconds = Timestamp.now().seconds
    const expiresAt = new Timestamp(newSeconds + time, 0)
    startCollaboration(id, expiresAt)
  }

  componentWillUnmount(){
    const {id} = this.props.match.params
    const {user} = this.props.auth
    this.unsubscribeFromCollab()
    //this.unsubscribeFromMessages()
    Object.keys(this.peopleWatchers).forEach(uid => this.peopleWatchers[uid]())
    leaveCollaboration(id, user.uid)
  }

  getCollaborationStatus = collaboration => {
    if(Object.keys(collaboration).length === 0){return 'loading'}
    if(!collaboration.expiresAt) {return 'notStarted'}
    if(Timestamp.now().seconds < collaboration.expiresAt.seconds) {return 'active'}
    else{return 'finished'}
  }

  reloadPage = () => {
    this.setState({reload: true})
  }

  render() {
    const {collaboration, joinedPeople, messages} = this.props
    const {inputValue} = this.state
    const {user} = this.props.auth

    const status = this.getCollaborationStatus(collaboration)

    if(status === 'loading'){ return <Spinner/> }
    return (
       <div className="content-wrapper">
        <div className="root">
          <div className="body">
            <div className="viewListUser">

            <JoinedPeople users={joinedPeople}/>

            </div>

            <div className="viewBoard">
              <div className="viewChatBoard">
                <div className="headerChatBoard">
                  <div className="headerChatUser">
                  <img className="viewAvatarItem" src={user.avatar} alt="icon avatar" />
                  <span className="textHeaderChatBoard">{user.fullName}</span>
                  </div>

                  { status === 'notStarted' &&
                    <div className="headerChatButton">
                  <button
                  onClick={() => this.onStartCollaboration(collaboration)}
                   className="button is-success"> Start Collaboration </button>
                </div>
                }
                {status === 'active' &&
                  <Timer seconds={collaboration.expiresAt.seconds - Timestamp.now().seconds}
                  timeOut={()=>{this.reloadPage()}}
                  />
                }
                { status === 'finished' &&
                <span className="tag is-warning is-medium"> Collaboration has finished </span>
                }
                </div>
                <div className="viewListContentChat">
                <ChatMessages
                authUser={user}
                messages={messages}
                />
                  <div style={{float: "left", clear: "both"}}></div>
                </div>
                <div className="viewBottom">
                  <input
                    disabled={status === 'finished' || status ==='notStarted'}
                   onChange={(e) => this.setState({inputValue: e.target.value})}
                   onKeyPress={this.onKeyboardPress}
                   value = {inputValue}
                   className="viewInput" placeholder="Type your message..."/>
                  <button
                  onClick={() => this.SendMessage(inputValue)}
                  disabled={status === 'finished' || status ==='notStarted'}
                   className="button is-primary is-medium"> 
                  Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = () => ({
  subToCollaboration,
  subToProfile,
  checkMessages
})

const mapState = (state) => {
  return {
    collaboration: state.collaboration.joined,
    joinedPeople: state.collaboration.joinedPeople,
    messages: state.collaboration.messages
  }
}

const Collaboration = authorization(withRouter(CollaborationDetail))

export default connect(mapState,mapDispatch())(Collaboration)


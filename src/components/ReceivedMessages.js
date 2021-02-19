import React from 'react'
import {connect} from 'react-redux'
import {markMessageAsRead} from 'actions'
import { render } from '@testing-library/react'
import {useHistory} from 'react-router-dom'

const ReceivedMessages = ({dispatch, messages}) => {

    const history = useHistory()

    const renderMessages = messages => {
        const handleClick = message => {
            markMessageAsRead(message)
        }
    
    const goToCollaborations = message => {
        markMessageAsRead(message)
        history.push(message.click)
    }
        
        const filteredMessages =  messages.filter(m => !m.isRead).map(message=>(<div>
            <div key={message.id} className="from-user">
                <span>From: </span>{message.fromUser.name}
            </div>
            <hr />
            <div className="navbar-item navbar-item-message">
                <div>
                {message.text}
                </div>
                <div onClick={() => goToCollaborations(message)}>
                <div className="button is-success">Join</div>
                </div>
                <button
                onClick={() => handleClick(message)}
                className="button is-warning">Later</button>
            </div>
        </div>))

        if(filteredMessages.length === 0){
            return <div className="navbar-item"> No new notifications</div>
        }
        return filteredMessages
    }
    return renderMessages(messages) 
}

const mapState = (state) => ({messages: state.auth.user.messages})

export default connect(mapState)(ReceivedMessages)
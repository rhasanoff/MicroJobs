import {combineReducers} from 'redux'

const initCollab = () => {
    const collaboration = (state ={}, action) => {
        switch(action.type) {
            case 'SET_COLLABORATION':
                return action.collaboration

            default:
                return state
        }
    }
    const joinedPeople = (state = [], action) => {
        switch(action.type) {
            case 'SET_COLLABORATION_PEOPLE':
                return action.joinedPeople
            case 'UPDATE_COLLABORATION_USER':
                const newJoinedPeople = [...state]
                const {user} = action
                const index = newJoinedPeople.findIndex(p => p.uid === user.uid)

                if(index < 0) {return state}
                if(newJoinedPeople[index].state === user.state){return state}
                newJoinedPeople[index].state = user.state
                return newJoinedPeople
            default:
                return state
        }
    }
    const messages = (state = [], action) => {
        switch(action.type) {
            case 'SET_CHAT_MESSAGES':
                const newMessages = [...state]
                action.messages.forEach(message => {
                    if(message.type === 'added'){
                        newMessages.push({id: message.doc.id, ...message.doc.data()})
                    }
                })
                return newMessages
            case 'RESET_CHAT_MESSAGES':
                return []
            default:
                return state
        }
    }

    return combineReducers({
        joined: collaboration,
        joinedPeople,
        messages
    })
}

const collaboration = initCollab()

export default collaboration
const init_state = {
    user: null,
    isAuth: false,
    isAuthResolved: false
}
const auth = (state = init_state, action) => {
    switch(action.type){
        case 'SET_AUTH_USER':
            return {user: action.user, isAuthResolved: true, isAuth: !!action.user}
        case 'RESET_AUTH_STATE':
            return {...state, isAuthResolved: false}
        case 'GET_USER_JOBS_SUCCESS':
            return {...state, user: {...state.user, jobs: action.jobs}}
        case 'GET_MESSAGES':
            return {...state, user: {...state.user, messages: action.messages}}
        case 'MARK_MESSAGE':
            const newMessages = state.user.messages.map(message => {
                if(message.id === action.messageId){
                    message.isRead = true
                }
                return message
            })
            return{...state, user: {...state.user, messages: newMessages}}
            default:
            return state
    }
}
export default auth
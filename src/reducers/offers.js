import {combineReducers} from 'redux'

const createOfferList = offersType => {
    return (state = [], action) => {
        if(action.offersType !== offersType){
            return state
        }
        switch(action.type){
            case 'GET_OFFERS_SUCCESS':
                return action.offers
            case 'CHANGE_OFFER_STATUS':{
                const nextState = [...state]
                const offerIndex = nextState.findIndex(o => o.id === action.offerId)
                nextState[offerIndex].status = action.status
                return nextState
            }
            case 'COLLABORATION_CREATED':{
                const nextState = [...state]
                const offerIndex = nextState.findIndex(o => o.id === action.offerId)
                nextState[offerIndex].collaborationCreated = true
                return nextState
            }
            default: return state
        }
    }
}

const offers = combineReducers({
    received: createOfferList('received'),
    sent: createOfferList('sent')
})

export default offers
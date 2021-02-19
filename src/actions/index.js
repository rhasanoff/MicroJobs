import db from 'database'
import * as api  from 'api'

export const requestJob = () => ({
    type: 'REQUEST_JOB'
})

export const createJob = (newJob, userId) => {
    newJob.price = parseInt(newJob.price, 10)
    newJob.user = api.createRef('users', userId)
    //newJob.user = userId
    return api.createJob(newJob)
}

export const getJobs = () => {
    return db.collection('jobs').get().then(snapshot=>{
        const jobs = snapshot.docs.map(doc =>({id: doc.id, ...doc.data()}))
        return {
            type:'GET_JOBS',
            jobs
        }
    })
}

/*export const getJobById = jobId => {
    return db.collection('jobs').doc(jobId).get().then(snapshot=>{
        return {
            type:'GET_JOB_BY_ID',
            job: {id: snapshot.id, ...snapshot.data()}
        }
    })
}*/
export const getJobById = jobId => (dispatch, getState) => {
    return api
      .getJobById(jobId)
      .then(async job => {
          debugger
         //job.user = await api.getUserProfile(job.user)
        const user = await job.user.get()
        job.user = user.data()
        job.user.id = user.uid
  
        dispatch({type: 'GET_JOB_BY_ID', job}
      )}
    )
  }

export const getUserJobs = userId => dispatch =>
    api.getUserJobs(userId).then(jobs  => dispatch({type:'GET_USER_JOBS_SUCCESS', jobs}))

export const register = (registerFormData) =>  api.register({...registerFormData})

export const createRef = (collection, docId) => api.createRef(collection, docId)


export const login = (loginData) =>  api.login({...loginData})

export const onAuthStateChanged = onAuthCallback => api.onAuthStateChanged(onAuthCallback)

export const storeAuthUser = authUser => dispatch => {
    if(authUser){
        return api.getUserProfile(authUser.uid)
        .then(userWithProfile => dispatch({user: userWithProfile, type: 'SET_AUTH_USER'}))
    } else {
        return dispatch({user: null, type: 'SET_AUTH_USER'})
    }
}

export const logout = (uid) => dispatch => 
    api.logout()
    .then(_ => {
        const userRef = api.createFirebaseRef('status', uid)
        return userRef.set(api.isOffline)
    })
    .then(_ => dispatch({user:null, type: 'SET_AUTH_USER'}))

export const resetAuthState = () => ({type: 'RESET_AUTH_STATE'})

export const createOffer = offer => api.createOffer(offer)

const getDataFromOffer = async (offer, userType) => {
    const job = await offer.job.get()
    const user = await offer[userType].get()
    offer.job = job.data()
    offer.job.id = job.id
    offer[userType] = user.data()

    return offer
}

export const getSentOffers = (userId) => dispatch => {
    return api.getSentOffers(userId)
                .then(async offers=> {
                    const o = await Promise.all(offers.map(offer => getDataFromOffer(offer, 'toUser')))
                    dispatch({type: 'GET_OFFERS_SUCCESS', offers, offersType:'sent'})
                    return o
                })
}

export const getReceivedOffers = (userId) => dispatch => {
    return api.getReceivedOffers(userId)
                .then(async offers => {
                    const o = await Promise.all(offers.map(offer => getDataFromOffer(offer, 'fromUser')))
                    dispatch({type: 'GET_OFFERS_SUCCESS', offers, offersType:'received'})
                    return o
                })
}

export const acceptOffer = (offerId) => dispatch => api.changeOfferStatus(offerId, 'accepted')
    .then(_ => dispatch({type: 'CHANGE_OFFER_STATUS', status:'accepted', offerId, offersType:'received'}))

export const declineOffer = (offerId) => dispatch => api.changeOfferStatus(offerId, 'declined')
    .then(_=> dispatch({type: 'CHANGE_OFFER_STATUS', status:'declined', offerId, offersType:'received'}))

export const collaborate = ({collaboration, message}) => dispatch =>
    api.createCollaboration(collaboration)
        .then(collabId => {
            message.click = `/collaborations/${collabId}`
            api.sendMessage(message)
            api.markOffer(collaboration.fromOffer)
            dispatch({
                type:'COLLABORATION_CREATED', 
                offerId: collaboration.fromOffer, 
                offersType:'sent'
            })
            debugger
            return collabId
        })

export const subscribeToMessages = (userId) => dispatch => 
    api.subscribeToMessages(userId, messages => dispatch({type:'GET_MESSAGES', messages}))

export const markMessageAsRead = message => api.markMessageAsRead(message)

export const getCollaborations = userId => api.getCollaborations(userId)

export const checkUserConnection = uid => {
    const userStatus = api.createFirebaseRef('status', uid)
    api.onConnectionChanged((isConnected) => {
        if(!isConnected){
            userStatus.set(api.isOffline)
            return null
        }
        userStatus.onDisconnect()
            .set(api.isOffline)
            .then(_ => userStatus.set(api.isOnline))
    })
}

export const subToCollaboration = (collabId, callback) => dispatch =>
    api.subToCollaboration(collabId, async collaboration => {
        let joinedPeople = []

        if(collaboration.joinedPeople){
            joinedPeople = await Promise.all(
                collaboration.joinedPeople.map(async userRef => {
                    const userDoc = await userRef.get()
                    return {id: userDoc.id, ...userDoc.data()}
                })
            )
        }
        dispatch({type:'SET_COLLABORATION', collaboration})
        dispatch({type:'SET_COLLABORATION_PEOPLE', joinedPeople})
        callback({joinedPeople})
    })

export const joinCollaboration = (collabId, userId) => api.joinCollaboration(collabId, userId)
export const leaveCollaboration = (collabId, userId) => api.leaveCollaboration(collabId, userId)


export const subToProfile = uid => dispatch =>
    api.subToProfile(uid, (user)=> {
       dispatch({type:'UPDATE_COLLABORATION_USER', user})
    })

export const sendChatMessage = message => api.sendChatMessage(message)

export const checkMessages = (collabId) => dispatch =>{
    dispatch({type:'RESET_CHAT_MESSAGES'})
    api.checkMessages(collabId, messages => {
        dispatch({type:'SET_CHAT_MESSAGES', messages})
    })
}

export const startCollaboration = (collabId, expiresAt) =>
    api.startCollaboration(collabId, expiresAt)
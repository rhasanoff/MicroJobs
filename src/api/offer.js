import db from 'database'
import { createRef } from './index'

export const createOffer = offer => db.collection('offers').add(offer)

export const getSentOffers = (userId) => {
    const userRef = createRef('users', userId)
    return db
        .collection('offers')
        .where('fromUser', '==', userRef)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
}

export const getReceivedOffers = (userId) => {
    const userRef = createRef('users', userId)
    return db
        .collection('offers')
        .where('toUser', '==', userRef)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
}

export const changeOfferStatus = (offerId, status) => 
    db.collection('offers')
        .doc(offerId)
        .update({status})

export const markOffer = (offerId) => 
    db.collection('offers')
        .doc(offerId)
        .update({collaborationCreated: true})
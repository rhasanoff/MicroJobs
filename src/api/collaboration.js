import db from 'database'
import firebase from 'firebase/app'
import { createRef } from './index'

export const createCollaboration = collab =>
    db.collection('collaborations')
        .add(collab)
        .then(doc => doc.id)


export const sendMessage = message =>
    db.collection('users')
        .doc(message.toUser)
        .collection('messages')
        .add(message)

export const subscribeToMessages = (userId, callback) => 
    db.collection('users')
        .doc(userId)
        .collection('messages')
        .onSnapshot(snapshot => { 
           const messages = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
           callback(messages)
        })
export const markMessageAsRead = message =>
        db.collection('users')
            .doc(message.toUser)
            .collection('messages')
            .doc(message.id)
            .update({isRead: true})

export const getCollaborations = userId =>
        db.collection('collaborations')
            .where('allowedPeople', 'array-contains', userId)
            .get()
            .then(snapshot => snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))

export const subToCollaboration = (collabId, callback) =>
        db.collection('collaborations')
        .doc(collabId)
        .onSnapshot(snapshot => {
            const collab = {id: snapshot.id, ...snapshot.data()}
            callback(collab)
        })
    
export const joinCollaboration = (collabId, uid) => {
    const userRef = createRef('users', uid)

    return db.collection('collaborations')
        .doc(collabId)
        .update({joinedPeople: firebase.firestore.FieldValue.arrayUnion(userRef)})
}

export const leaveCollaboration = (collabId, uid) => {
    const userRef = createRef('users', uid)

    return db.collection('collaborations')
        .doc(collabId)
        .update({joinedPeople: firebase.firestore.FieldValue.arrayRemove(userRef)})
}

export const subToProfile = (uid, callback) => 
    db.collection('users')
    .doc(uid)
    .onSnapshot(snapshot=> {
        const user = {id:snapshot.id, ...snapshot.data()}
        callback(user)
    })

export const sendChatMessage = ({message, collabId, timestamp}) =>
    db.collection('collaborations')
        .doc(collabId)
        .collection('messages')
        .doc(timestamp)
        .set(message)

export const checkMessages = (collabId, callback) =>
    db.collection('collaborations')
        .doc(collabId)
        .collection('messages')
        .onSnapshot(snapshot => callback(snapshot.docChanges()))
export const startCollaboration = (collabId, expiresAt) =>
    db.collection('collaborations')
    .doc(collabId)
    .update({expiresAt})
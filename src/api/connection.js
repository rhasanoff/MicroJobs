import firebase from 'firebase/app'
import 'firebase/database'

export const createFirebaseRef = (collection, uid) => firebase.database().ref(`/${collection}/${uid}`)

export const isOffline = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP
}

export const isOnline = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP
}

export const onConnectionChanged = (callback) => 
    firebase.database()
        .ref('.info/connected')
        .on('value', snapshot => callback(snapshot.val()))
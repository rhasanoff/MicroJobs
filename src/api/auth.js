import db from 'database'
import firebase from 'firebase/app'
import 'firebase/auth'
import { createFirebaseRef } from './connection'

const createUserProfile = (userProfile) => {
  return db
    .collection('users')
    .doc(userProfile.uid)
    .set(userProfile)
}

export const register = async ({
  email,
  password,
  fullName,
  avatar
}) => {
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const {user} = res
    const userProfile = {
      uid: user.uid,
      fullName,
      email,
      avatar,
      jobs: [],
      decription: ''
    }
    await createUserProfile(userProfile)
    return userProfile
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const login = ({
  email,
  password
}) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => Promise.reject(error.message))
}

export const logout = () => firebase.auth().signOut()

export const onAuthStateChanged = (onAuthCallback) => firebase.auth().onAuthStateChanged(onAuthCallback)

export const getUserProfile = uid =>
  db.collection('users')
  .doc(uid)
  .get()
  .then(snapshot => ({
    uid,
    ...snapshot.data()
  }))




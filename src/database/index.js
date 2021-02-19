import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.initializeApp(
    {
        apiKey: "AIzaSyCCDUFsKeD01wdSSNt4Aqa2Xcr463prrp4",
        authDomain: "microjobs-4afbf.firebaseapp.com",
        databaseURL: "https://microjobs-4afbf.firebaseio.com",
        projectId: "microjobs-4afbf",
        storageBucket: "microjobs-4afbf.appspot.com",
        messagingSenderId: "1045619401631",
        appId: "1:1045619401631:web:bcd2d06c8cff704ca313aa",
        measurementId: "G-ESY36BYX7N"
    }
).firestore()

export default db
const { Timestamp } = firebase.firestore
export { Timestamp }

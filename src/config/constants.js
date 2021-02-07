import firebase from 'firebase'

const config = {
}

firebase.initializeApp(config)
export const firebaseRef=firebase
export const storage=firebase.storage()
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDLo9Ycf0EzlilhwiFh9Zah5LtiodZUNH8",
  authDomain: "splitsearch-b0241.firebaseapp.com",
  projectId: "splitsearch-b0241",
  storageBucket: "splitsearch-b0241.appspot.com",
  messagingSenderId: "73108573104",
  appId: "1:73108573104:web:2bd6a8fe9db0d46d3f2475",
  measurementId: "G-3FZ72RPMM3",
  databaseURL:"https://splitsearch-b0241.firebaseio.com"
}

firebase.initializeApp(config)
export const firebaseRef=firebase
export const storage=firebase.storage()
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
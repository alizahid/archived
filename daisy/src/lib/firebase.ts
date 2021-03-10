import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCDEpHCe3IOR7BnHiu52SEAAR55DrP_36I',
  appId: '1:855514415078:web:bf9e56ac5ec79d70d06027',
  authDomain: 'daisy-851ae.firebaseapp.com',
  databaseURL: 'https://daisy-851ae.firebaseio.com',
  messagingSenderId: '855514415078',
  projectId: 'daisy-851ae',
  storageBucket: 'daisy-851ae.appspot.com'
}

firebase.initializeApp(config)

export { firebase }

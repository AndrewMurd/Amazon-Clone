import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2pLQ6P9wrHWUazFLd6RvQ3Y3teVUj8kQ",
  authDomain: "clone-4e1df.firebaseapp.com",
  projectId: "clone-4e1df",
  storageBucket: "clone-4e1df.appspot.com",
  messagingSenderId: "738553645820",
  appId: "1:738553645820:web:d37e90da26aead8a43a579",
  measurementId: "G-JMZ4PBYFX2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};
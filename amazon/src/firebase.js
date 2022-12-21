import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC4hmZp5rKh-kqSNUFQJNt81L2gRh85ouU",
  authDomain: "clone-d077e.firebaseapp.com",
  projectId: "clone-d077e",
  storageBucket: "clone-d077e.appspot.com",
  messagingSenderId: "697915260487",
  appId: "1:697915260487:web:3efe648a3584d42d8abb62"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
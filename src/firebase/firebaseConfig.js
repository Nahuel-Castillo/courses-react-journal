
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDzRjfrASFC3EuSTktazsAXM8mc4WKtAfk",
    authDomain: "react-app-curso-2428c.firebaseapp.com",
    projectId: "react-app-curso-2428c",
    storageBucket: "react-app-curso-2428c.appspot.com",
    messagingSenderId: "403400385973",
    appId: "1:403400385973:web:f553cacdd8c3ae210625fc"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}
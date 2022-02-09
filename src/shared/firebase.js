import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyD-sItmqwx9GPTKgn6zYc56BwOo2_49Heo",
    authDomain: "imageboard-4806c.firebaseapp.com",
    projectId: "imageboard-4806c",
    storageBucket: "imageboard-4806c.appspot.com",
    messagingSenderId: "954858123179",
    appId: "1:954858123179:web:c0d429786ddef594a06cee",
    measurementId: "G-D7LEPRYT7B"
  };

firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export { auth, apiKey, firestore, storage, realtime};
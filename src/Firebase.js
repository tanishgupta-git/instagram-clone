import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBqbJZQNvOB2j2B_mbDIpcYgo0snAhv4Ik",
    authDomain: "instagram-clone-4ed61.firebaseapp.com",
    databaseURL: "https://instagram-clone-4ed61.firebaseio.com",
    projectId: "instagram-clone-4ed61",
    storageBucket: "instagram-clone-4ed61.appspot.com",
    messagingSenderId: "716263895264",
    appId: "1:716263895264:web:64af3937215b478bb52085",
    measurementId: "G-BF825X55LM"
})
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db,auth,storage};
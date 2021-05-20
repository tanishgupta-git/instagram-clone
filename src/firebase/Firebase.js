import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket:process.env.REACT_APP_storageBucket,
    messagingSenderId:process.env.REACT_APP_messagingSenderId,
    appId:process.env.REACT_APP_appId,
    measurementId:process.env.REACT_APP_measurementId
})

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;       
    const userRef = db.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
       const {displayName,uid} = userAuth;
       try{
        await userRef.set({
            uid:uid,
            username: displayName,
            name:"",
            imageUrl:"",
            bio:"",
            website:"",
            profession:"",
            email:""
        })
       }catch(error){
          console.log('error creating user ',error.message);
       }
    }

    return userRef;
 }
 
 export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
       const unsubscribe = auth.onAuthStateChanged(userAuth => {
          unsubscribe();
          resolve(userAuth);
       },reject)
    })
 }

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db,auth,storage};
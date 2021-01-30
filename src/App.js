import React,{useEffect} from 'react';
import { auth, createUserProfileDocument } from './firebase/Firebase';
import { connect } from 'react-redux';
import SignInAndSignUp from './components/SignInAndSignUp/SignInAndSignUp';
import HomePage from './components/HomePage/HomePage';
import { setUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { userSelector } from './redux/user/user.selectors';

function App({user,setUser}) {
  
  //  fetching the user from firebase
  useEffect( () => {
    const unsubscribe =  auth.onAuthStateChanged(async (authUser) => {
     
      if(authUser){

       const userRef = await createUserProfileDocument(authUser);  

       userRef.onSnapshot( snapshot => {
         setUser(snapshot.data());
       })
       
     }
     else{
      setUser(null);
     }

    })
    return () => {
      unsubscribe();
    }

  },[setUser]);


  return (
    <div className="app">
    {
       user ? <HomePage />  :  <SignInAndSignUp /> 
    }      
    </div> 
  );
}

const mapStateToProps = createStructuredSelector({
  user : userSelector
})
const mapDispatchToProps = dispatch => ({
  setUser : user => dispatch(setUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
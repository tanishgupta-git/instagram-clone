import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import SignInAndSignUp from './components/SignInAndSignUp/SignInAndSignUp';
import HomePage from './components/HomePage/HomePage';
import { checkUserSession  } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { userSelector } from './redux/user/user.selectors';

function App({user,checkUserSession}) {
  
  //  fetching the user from firebase
  useEffect( () => {  
   checkUserSession();
  },[checkUserSession]);


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
  checkUserSession : () => dispatch(checkUserSession())
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
import React,{useEffect,lazy,Suspense} from 'react';
import { connect } from 'react-redux';
import { checkUserSession  } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { userSelector } from './redux/user/user.selectors';
import Spinner from './components/Spinner/Spinner';
import ErrorBoundary from './components/error-boundary/error-boundary';

const HomePage = lazy(() => import('./components/HomePage/HomePage'))
const SignInAndSignUp = lazy(() => import('./components/SignInAndSignUp/SignInAndSignUp'))
const  App = ({user,checkUserSession}) => {
  
  //  fetching the user from firebase
  useEffect( () => {  
    console.log(process.env);
   checkUserSession();
  },[checkUserSession]);


  return (
    <div className="app">
    <ErrorBoundary>
     <Suspense fallback={<Spinner centerPage/>}>
    {
       user ? 
      <HomePage /> 
        :  
      <SignInAndSignUp />
    }
    </Suspense>   
    </ErrorBoundary>   
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
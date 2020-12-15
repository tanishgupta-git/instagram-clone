import React,{useState,useEffect} from 'react';
import { auth} from './Firebase';
import { Switch,Route, Redirect } from 'react-router-dom';
import SignInAndSignUp from './components/SignInAndSignUp';
import HomePage from './components/HomePage';

function App() {
  
  const [user,Setuser] = useState(null);
  const [username,Setusername] = useState("");
  //  fetching the user from firebase
  useEffect( () => {
    const unsubscribe =  auth.onAuthStateChanged((authUser) => {
     if(authUser){
       Setuser(authUser);
     }else{
      Setuser(null);
     }
    })
    return () => {
      unsubscribe();
    }

  },[user,username]);


  return (
    <div className="app" style={{ width:'100%',height:'100%'}}>
    <Switch>
    <Route exact path='/signin' render={() => user ? (<Redirect to='/home' />) : (<SignInAndSignUp username={username} Setusername={Setusername} />)}/>
    <Route  path='/' render={(props) => user ? (<HomePage {...props} user={user} />) : (<Redirect to='/signin' />)} />
    </Switch> 
    </div> 
  );
}
export default App;
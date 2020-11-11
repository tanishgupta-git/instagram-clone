import React,{useState,useEffect} from 'react';
import './App.css';
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
       console.log(authUser);
     }else{
      Setuser(null);
     }
    })
    return () => {
      unsubscribe();
    }
  },[user,username]);


  return (
    <div className="app">
    <Switch>
    <Route exact path='/' render={() => user ? (<HomePage user={user} />) : (<Redirect to='/signin' />)} />
    <Route exact path='/signin' render={() => user ? (<Redirect to='/' />) : (<SignInAndSignUp username={username} Setusername={Setusername} />)}/>
    </Switch> 
    </div> 
  );
}
export default App;
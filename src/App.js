import React,{useState,useEffect} from 'react';
import { auth} from './Firebase';
import SignInAndSignUp from './components/SignInAndSignUp/SignInAndSignUp';
import HomePage from './components/HomePage/HomePage';

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
    <div className="app">
    { user ? 
    <HomePage user={user} /> 
    : <SignInAndSignUp username={username} Setusername={Setusername} /> 
    }      
    </div> 
  );
}
export default App;
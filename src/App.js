import React,{useState,useEffect} from 'react';
import { auth, createUserProfileDocument } from './Firebase';
import SignInAndSignUp from './components/SignInAndSignUp/SignInAndSignUp';
import HomePage from './components/HomePage/HomePage';
import LoadingContextProvider from './contexts/loadingContext';
import PopUpContextProvider from './contexts/PopUpContext';

function App() {
  
  const [user,Setuser] = useState(null);
  const [username,Setusername] = useState("");
  //  fetching the user from firebase
  useEffect( () => {
    const unsubscribe =  auth.onAuthStateChanged(async (authUser) => {
     
      if(authUser){
       const userRef = await createUserProfileDocument(authUser);
       
       userRef.onSnapshot( snapshot => {
         Setuser(snapshot.data());
       })
     }
     else{
      Setuser(null);
     }

    })
    return () => {
      unsubscribe();
    }

  },[user,username]);


  return (
    <div className="app">
    {
       user ? 
    <PopUpContextProvider>
      <LoadingContextProvider>
          <HomePage user={user} />
        </LoadingContextProvider> 
         </PopUpContextProvider>
    : <SignInAndSignUp username={username} Setusername={Setusername} /> 
    }      
    </div> 
  );
}
export default App;
import React,{useState,useEffect} from 'react';
import './App.css';
import { auth, db} from './Firebase';
import ImageUpload from './components/ImageUpload';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Header from './components/Header';
import PostsParent from './components/PostsParent';

function App() {
  const [posts,Setposts] = useState([]);
  const [user,Setuser] = useState(null);
  const [open,Setopen] = useState(false);
  const [username,Setusername] = useState("");
  const [openSignIn,SetopenSignIn] = useState(false);

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


  useEffect(() => {
    // runs every time when post chnages
    db.collection('posts').orderBy('timeStamp','desc').onSnapshot( snapshot => {
      Setposts(snapshot.docs.map(doc => ({
        id:doc.id,
        post:doc.data()
      })))

    })

  },[])

  return (
    <div className="app">
     <Signup open={open} Setopen={Setopen} username={username} Setusername={Setusername}/>
     <Signin openSignIn={openSignIn} SetopenSignIn={SetopenSignIn}/>
     <Header user={user} Setopen={Setopen} SetopenSignIn={SetopenSignIn} />
     <PostsParent user={user} posts={posts}/>
     { user && (<ImageUpload username={user.displayName}/>)}
     
    </div>
  );
}

export default App;
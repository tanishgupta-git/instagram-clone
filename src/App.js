import React,{useState,useEffect} from 'react';
import './App.css';
import Posts from './components/Posts';
import { auth, db} from './Firebase';
import { Button} from '@material-ui/core';
import ImageUpload from './components/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
import Signup from './components/Signup';
import Signin from './components/Signin';


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
      <div className='app__header'>
        <img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/>
        { user ? (<Button onClick={() => auth.signOut()}>Logout</Button>):
       <div className='app__loginContainer'>
        <Button onClick={() => SetopenSignIn(true)}>Sign In</Button>
        <Button onClick={ () => Setopen(true)}>Sign Up</Button>
        </div> }
      </div>
    <div className='app__posts'>
    <div className='app__postsLeft'>
      { 
        posts.map( ({id,post}) => {
          return  (
            <Posts key={id} postId = {id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )
        })
      }
      </div>
      <div className='app__postsRight'>
      <InstagramEmbed
          url='https://www.instagram.com/p/B5qCrnpllqs7Y8xVYZTVhz_lDjI_ngTxpbPD-k0/'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
/>
</div>
      </div>
      { user?.displayName ? (
    <ImageUpload username={user.displayName}/>
   ):(
     <h3 style={{
       margin:'0 10px'
     }}>Sorry You need to login before upload the posts</h3>
   )}
    </div>
  );
}

export default App;

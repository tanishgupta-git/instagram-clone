import React,{useState,useEffect} from 'react'
import Header from './Header';
import { db} from '../Firebase';
import PostsParent from './PostsParent';
import { Switch,Route } from 'react-router-dom';
import MyProfile from './MyProfile';
import Chats from './Chats';

function HomePage({user}) {
    const [posts,Setposts] = useState([]);
    //   fetching the post from firebase
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
        <div>
        <Header user={user}/>
        <Switch>
        <Route path='/home' render={ (props) => <PostsParent {...props} user={user} posts={posts} /> } />
        <Route path='/myprofile' component={MyProfile}/>
        <Route path='/chats' render={ (props) => <Chats user={user} /> } />
        </Switch>
        
        </div>
    )
}

export default HomePage

import React,{useState,useEffect} from 'react'
import Header from './Header';
import { db} from '../Firebase';
import PostsParent from './PostsParent';
import { Switch,Route } from 'react-router-dom';
import MyProfile from './MyProfile';
import Chats from './Chats';
import Loading from '../static/Loading.gif';

function HomePage({user}) {
    const [posts,Setposts] = useState([]);
    const [loading,Setloading] = useState(true);

    //   fetching the post from firebase
  useEffect(() => {
    // runs every time when post chnages
    db.collection('posts').orderBy('timeStamp','desc').onSnapshot( snapshot => {
      Setposts(snapshot.docs.map(doc => ({
        id:doc.id,
        post:doc.data()
      })))
     Setloading(false);
    })

  },[])

    return (  
        <div style={{width:'100%',height:'100%'}}>
        {loading && <div className='loading'><Loading /></div>}
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

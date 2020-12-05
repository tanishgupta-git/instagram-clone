import React,{useState,useEffect} from 'react'
import Header from './Header';
import { db} from '../Firebase';
import PostsParent from './PostsParent';
import { Switch,Route } from 'react-router-dom';
import MyProfile from './MyProfile';
import Chats from './Chats';
import ImageUpload from './ImageUpload';
import './HomePage.css';
import Loading from '../static/Loading.gif';

function HomePage({user}) {
    const [posts,Setposts] = useState([]);
    const [loading,Setloading] = useState(true);
    const [openPop,SetopenPop] = useState(false);
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
        <div className='HomePage' style={{width:'100%',height:'100%'}}>
        {loading && <div className='loading'><img src={Loading} alt=''/></div>}
        <Header user={user} openPop={openPop} SetopenPop={SetopenPop}/>
        <Switch>
        <Route path='/home' render={ (props) => <PostsParent {...props} user={user} posts={posts} SetopenPop={SetopenPop} /> } />
        <Route path='/myprofile' render={(props) => <MyProfile {...props} SetopenPop={SetopenPop} /> } />
        <Route path='/chats' render={ (props) => <Chats {...props} user={user} SetopenPop={SetopenPop}/> } />
        <Route path='/addpost' render={ (props) => <ImageUpload  {...props} username={user.displayName} SetopenPop={SetopenPop} />} />
        </Switch>
        </div>
    )
}

export default HomePage

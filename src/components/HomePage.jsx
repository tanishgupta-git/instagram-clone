import React,{useState,useEffect} from 'react'
import Header from './Header';
import { db} from '../Firebase';
import PostsParent from './PostsParent';
import { Switch,Route } from 'react-router-dom';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import Chats from './Chats';
import ImageUpload from './ImageUpload';
import './HomePage.css';
import Loading from '../static/Loading.gif';

function HomePage({props,user}) {
    const [posts,Setposts] = useState([]);
    const [loading,Setloading] = useState(true);
    const [openPop,SetopenPop] = useState(false);
    const [homeClick,SethomeClick] = useState(false);
    const [chatsClick,SetchatsClick] = useState(false);
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
        <Header user={user} openPop={openPop} SetopenPop={SetopenPop} homeClick={homeClick} chatsClick={chatsClick}/>
        <Switch>
        <Route path='/home' render={ (props) => <PostsParent {...props} user={user} posts={posts} SetopenPop={SetopenPop} SethomeClick={SethomeClick} /> } />
        <Route exact path='/myprofile/:username/:userId' render={(props) => <MyProfile props={props} user={user} SetopenPop={SetopenPop} /> } />
        <Route path='/myprofile/:username/:userId/edit' render={(props) => <EditProfile props={props} user={user} SetopenPop={SetopenPop} /> } />
        <Route path='/chats' render={ (props) => <Chats {...props} user={user} SetopenPop={SetopenPop} SetchatsClick={SetchatsClick} /> } />
        <Route path='/addpost' render={ (props) => <ImageUpload  props={props} user={user} SetopenPop={SetopenPop} />} />
        </Switch>
        </div>
    )
}

export default HomePage

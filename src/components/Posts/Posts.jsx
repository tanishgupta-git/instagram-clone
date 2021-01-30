import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import { db} from '../../firebase/Firebase';
import {Link} from 'react-router-dom';
import { RiAddCircleLine } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import Spinner from '../Spinner/Spinner';
import UserOnline from '../../static/UserOnline.svg';
import './Posts.css';
import { setLoading } from '../../redux/loading/loading.actions.js'
import { setHidePopup } from '../../redux/hidePopup/hidePopup.actions.js';

function Posts({setLoading,setHidePopup,SethomeClick}) {
  const [posts,Setposts] = useState([]);
  const [postsLoading,SetpostsLoading] = useState(false);
  const [lastPostfetch,SetlastPostfetch] = useState();
  const [noPosts,SetnoPosts] = useState(false);

      //   fetching the post from firebase
      useEffect(() => {
        // runs every time when post changes
        let unsubscribe=  db.collection('posts').orderBy('timeStamp','desc').limit(3).onSnapshot( snapshot => {
          Setposts(snapshot.docs.map(doc => ({
            id:doc.id,
            post:doc.data()
          })))
         SetlastPostfetch(snapshot.docs[snapshot.docs.length - 1]);
         setLoading();
        })
        return () => unsubscribe();
      },[setLoading])

    // setting the popup to false
    useEffect(() => {
      setHidePopup(false);
    },[setHidePopup])

    useEffect(() => {
       SethomeClick(true);
       return () => SethomeClick(false);
    })

    // adding the scrolling event
    useEffect( () => {
      window.addEventListener("scroll",isScrolling);
      SetnoPosts(false);
      return () => window.removeEventListener("scroll",isScrolling);
    },[])
 

    function isScrolling() {
      if(document.documentElement.offsetHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight - 3 ) {  
         SetpostsLoading(true);
      }
    }

    // fetching the posts when scrollbar reached at the bottom
    useEffect(() => {

      if(!postsLoading) return;
      setTimeout(() => { if(lastPostfetch) {db.collection('posts').orderBy('timeStamp','desc').startAfter(lastPostfetch).limit(3).get().then( snapshot => {
        if(!snapshot.docs.length) return snapshot;
        if( lastPostfetch.id === snapshot.docs[snapshot.docs.length - 1].id) return snapshot;
        Setposts( prevState => [...prevState,...(snapshot.docs.map( doc => ({
          id:doc.id,
          post:doc.data()
        }))) ])
        return snapshot;
      })
      .then((snapshot) => {
        if(!snapshot.docs.length){ 
          SetnoPosts(true);
          return;
        }
       if(!(lastPostfetch.id === snapshot.docs[snapshot.docs.length - 1].id))  SetlastPostfetch(snapshot.docs[snapshot.docs.length -1 ]) })
      .then( () => SetpostsLoading(false))}},1500);
    },[postsLoading,lastPostfetch])

    return (
      <div className='Posts'>
        <div className='app__posts'>
        <div className='app__postsLeft'>
          { 
            posts.map( ({id,post}) => {
              return  (
                <Post key={id} postId ={id} post={post} />
              )
            })
          }
          { noPosts && <div className='app__postsLeft__noposts'><FaRegCheckCircle /> 
          <p className='app__postsLeft__noposts__msg'>You're All Caught Up</p>
          <p className='app__postsLeft__noposts__muted'>No More Posts</p> </div>}
          { postsLoading && <Spinner/>}
          </div>
          <div className='app__postsRight'>
            <p className='app__postsRight__quote'>" I am lost, So Follow at your own risk "</p>
            <p className='app__postsRight__author'>Sushant Singh Rajput</p>
            <img className='app__postsRight__Usersvg' src={UserOnline} alt=""/>
              <Link to='/addpost'><RiAddCircleLine className='header__popupIcon' /> Add New Post</Link>
              <p className='app__postsRight__text'>&copy; 2021 InstaClone By Tanish Gupta</p>
          </div>         
          </div>
          </div>
    )
}

const mapDispatchToProps = dispatch => ({
  setLoading : () => dispatch(setLoading()),
  setHidePopup : userCond => dispatch(setHidePopup(userCond))
})

export default connect(null,mapDispatchToProps)(Posts);
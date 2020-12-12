import React,{useState,useEffect} from 'react'
import Posts from './Posts';
import { db} from '../Firebase';
import {Link} from 'react-router-dom';
import './PostParent.css';
import { RiAddCircleLine } from "react-icons/ri";
import Spinner from './Spinner';
import UserOnline from '../static/UserOnline.svg';

function PostsParent({user,SetopenPop,SethomeClick,Setloading}) {
  const [posts,Setposts] = useState([]);
  const [postsLoading,SetpostsLoading] = useState(false);
  const [lastPostfetch,SetlastPostfetch] = useState();
      //   fetching the post from firebase
      useEffect(() => {
        // runs every time when post chnages
        let unsubscribe=  db.collection('posts').orderBy('timeStamp','desc').limit(3).onSnapshot( snapshot => {
          Setposts(snapshot.docs.map(doc => ({
            id:doc.id,
            post:doc.data()
          })))
         SetlastPostfetch(snapshot.docs[snapshot.docs.length - 1]);
         Setloading(false);
        })
        return () => unsubscribe();
      },[Setloading])
    // setting the popup to false
    useEffect(() => {
      SetopenPop(false);
    },[SetopenPop])
    useEffect(() => {
       SethomeClick(true);
       return () => SethomeClick(false);
    })
    // adding the scrolling event
    useEffect( () => {
      window.addEventListener("scroll",isScrolling);
      return () => window.removeEventListener("scroll",isScrolling);
    },[])

    function isScrolling() {

      if(document.documentElement.offsetHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight-1 ) {
        SetpostsLoading(true);
      }
    }

    // fetching the posts when scrollbar reached at the bottom
    useEffect(() => {

      if(!postsLoading) return;
      setTimeout(() => db.collection('posts').orderBy('timeStamp','desc').startAfter(lastPostfetch).limit(3).get().then( snapshot => {
        if(!snapshot.docs.length) return snapshot;
        if( lastPostfetch.id === snapshot.docs[snapshot.docs.length - 1].id) return snapshot;
        Setposts( prevState => [...prevState,...(snapshot.docs.map( doc => ({
          id:doc.id,
          post:doc.data()
        }))) ])
        return snapshot;
      })
      .then((snapshot) => {
        if(!snapshot.docs.length) return;
       if(!(lastPostfetch.id === snapshot.docs[snapshot.docs.length - 1].id))  SetlastPostfetch(snapshot.docs[snapshot.docs.length -1 ]) })
      .then( () => SetpostsLoading(false)),1500);
    },[postsLoading,lastPostfetch])

    return (
      <div className='Posts'>
        <div className='app__posts'>
        <div className='app__postsLeft'>
          { 
            posts.map( ({id,post}) => {
              return  (
                <Posts key={id} postId ={id} user={user} post={post} />
              )
            })
          }
          { postsLoading && <Spinner />}
          </div>
          <div className='app__postsRight'>
          <p className='app__postsRight__quote'>" He who has a why  to live can bear almost any how "</p>
          <p className='app__postsRight__author'>Friedrich Nietzsche</p>
          <img className='app__postsRight__Usersvg' src={UserOnline} alt=""/>
            <Link to='/addpost'><RiAddCircleLine className='header__popupIcon' /> Add New Post</Link>
            <p className='app__postsRight__text'>&copy; 2020 InstaClone By Tanish Gupta</p>
          </div>         
          </div>
          </div>
    )
}

export default PostsParent;
import React,{useState,useEffect} from 'react'
import Posts from './Posts';
import { db} from '../Firebase';
import {Link} from 'react-router-dom';
import './PostParent.css';
import { RiAddCircleLine } from "react-icons/ri";
import UserOnline from '../static/UserOnline.svg';

function PostsParent({user,SetopenPop,SethomeClick,Setloading}) {
  const [posts,Setposts] = useState([]);
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
      },[Setloading])
    // setting the popup to false
    useEffect(() => {
      SetopenPop(false);
    },[SetopenPop])
    useEffect(() => {
       SethomeClick(true);
       return () => SethomeClick(false);
    })
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

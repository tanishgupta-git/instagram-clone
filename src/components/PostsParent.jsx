import React,{useEffect} from 'react'
import Posts from './Posts';
import {Link} from 'react-router-dom';
import './PostParent.css';
import { RiAddCircleLine } from "react-icons/ri";
import UserOnline from '../static/UserOnline.svg';

function PostsParent({posts,user,SetopenPop}) {

    // setting the popup to false
    useEffect(() => {
      SetopenPop(false);
    },[SetopenPop])
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

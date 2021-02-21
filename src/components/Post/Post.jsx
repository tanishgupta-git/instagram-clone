import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../../firebase/Firebase';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { BsHeart,BsHeartFill,BsChat } from "react-icons/bs";
import { createStructuredSelector } from 'reselect';
import { userSelector } from '../../redux/user/user.selectors';

function Post({user,postId,post}) {
 
  const [commentsCount,SetcommentsCount] = useState();
  const [comment,Setcomment] = useState('');
  const [likes,Setlikes] = useState(0);
  const [liked,Setliked] =  useState(false);
  const [doubleClicked,SetdoubleClicked] = useState(false);
  const [postUserImage,SetpostUserImage] = useState("");

  useEffect( () => {
    let unsubscribe;
    let unsubscribeLike;

      unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy('timestamp','desc')
      .onSnapshot( (snapshot) => {
        SetcommentsCount(snapshot.docs.length);
      })

      unsubscribeLike = db.collection("posts").doc(postId).collection("likes").orderBy('timestamp','desc')
      .onSnapshot( (snapshot) => {
        snapshot.docs.forEach( (doc) => {
          if (doc.data().userId === user.uid) {
            Setliked(true);
          }  
        })
        Setlikes(snapshot.docs.length);
      }
      )

    return () => {
      unsubscribe();
      unsubscribeLike();
    };
  },[postId,user.uid])

  // fetching the post user imageUrl
  useEffect(() => {
    db.collection('users').doc(post.userId).get().then(function(doc) {
      SetpostUserImage(doc.data().imageUrl);
  })
  })

// function for commenting to the post
  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection('comments').add({
      text:comment,
      username:user.username,
      userId:user.uid,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
    Setcomment('');
  }

// function for adding like to the post by uid provided by the firebase
  const addLiked = () => {
    db.collection("posts").doc(postId).collection('likes').doc(user.uid).set({
      userId:user.uid,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    }).then(() =>  { Setliked(true);SetdoubleClicked(false);} )
  }

  // function for removing the like from the post 
  const removeLiked = () => {
    db.collection("posts").doc(postId).collection('likes').doc(user.uid).delete()
    .then( () => { Setliked(false);SetdoubleClicked(false);})
  }
 
  // run when user doubleclicked
  const addDoubleClicked = () => {
    SetdoubleClicked(true);
    addLiked();
  }
    return (
        <div className='post'>
          <div className='post__header'>
          <Link to={`/profile/${post.username}/${post.userId}`} ><Avatar className='post__avatar' alt={post.username}  src={ !!postUserImage ? postUserImage:" " } /></Link>
          <p><Link className='post__user' to={`/profile/${post.username}/${post.userId}`} >{post.username}</Link></p>
          </div> 

          <div className='post__imageContainer'>
          { doubleClicked && <BsHeartFill className='doubleclick-liked'/>}
          <img onDoubleClick={addDoubleClicked} className='post__imageContainer__img' src={post.imageUrl} alt=''/>
          </div>

          <div className='post__likeComment'>
            
            { liked ? <BsHeartFill className='post-liked' onClick={removeLiked}/> : <BsHeart onClick={addLiked} /> }
            <Link to={`/p/${postId}`}><BsChat /></Link>
          </div>

          <p className='post__likes'>{likes} Likes</p>

          <p className='post__text'><strong><Link  className='post__user' to={`/profile/${post.username}/${post.userId}`} >{post.username}</Link></strong> {post.caption}</p>
          
           <div className="post__commentsCount">
              { !commentsCount ? "" : <Link to={`/p/${postId}`}>View all {commentsCount} comments</Link>}
           </div>
          
        { user && 
          <form className='post__commentBox'>
            <input className="post__input" type='text' placeholder='Add a comment ...' value={comment} 
            onChange={ (e) => Setcomment(e.target.value)} />
            <button disabled={!comment} className="post__button" type='submit' onClick={postComment}>Post</button>
          </form> }          
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
  user : userSelector
})

export default connect(mapStateToProps)(Post);
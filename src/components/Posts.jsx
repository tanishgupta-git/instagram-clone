import React, { useEffect, useState } from 'react'
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../Firebase';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { BsHeart,BsHeartFill,BsChat } from "react-icons/bs";

function Posts({user,postId,post}) {
 
  const [comments,Setcomments] = useState([]);
  const [comment,Setcomment] = useState('');
  const [likes,Setlikes] = useState(0);
  const [liked,Setliked] =  useState(false);
  const [postUserImage,SetpostUserImage] = useState("");

  useEffect( () => {
    let unsubscribe;
    let unsubscribeLike;

    if(postId){

      unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy('timestamp','desc')
      .onSnapshot( (snapshot) => {
        Setcomments(snapshot.docs.map( (doc) => doc.data()));
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
    }

    return () => {
      unsubscribe();
      unsubscribeLike();
    };
  },[postId,user.uid])

  // fetching the post user imageUrl
  useEffect(() => {
    db.collection('users').doc(post.userId).onSnapshot(function(doc) {
      SetpostUserImage(doc.data().imageUrl);
  })
  })

// function for commenting to the post
  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection('comments').add({
      text:comment,
      username:user.displayName,
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
    }).then(() =>  Setliked(true))
  }

  // function for removing the like from the post 
  const removeLiked = () => {
    db.collection("posts").doc(postId).collection('likes').doc(user.uid).delete()
    .then( () => Setliked(false))
  }

    return (
        <div className='post'>
          <div className='post__header'>
          <Link to={`/myProfile/${post.userId}`} ><Avatar className='post__avatar' alt={post.username}  src={ !!postUserImage ? postUserImage:" " } /></Link>
          <h4><Link to={`/myProfile/${post.username}/${post.userId}`} >{post.username}</Link></h4>
          </div> 

          <img className='post__image' src={post.imageUrl} alt=''/>

          <div className='post__likeComment'>
            
            { liked ? <BsHeartFill className='post-liked' onClick={removeLiked}/> : <BsHeart onClick={addLiked} /> }
            <BsChat />
          </div>

          <h4 className='post__text'><strong>{likes} Likes</strong></h4>
          <h4 className='post__text'><strong><Link  to={`/myProfile/${post.username}/${post.userId}`} >{post.username}</Link></strong> {post.caption}</h4>
          
           <div className="post__comments">
              {
                comments.map( (comment) => (
                   ( <p key={Math.random()}>
                      <strong>{comment.username}</strong> {comment.text}
                    </p>)
    
                ))
              }
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
export default Posts
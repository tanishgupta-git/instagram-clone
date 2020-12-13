import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../Firebase';
import { Link } from 'react-router-dom';
import './PostComments.css';

function PostComments({props}) {
    const [comments,Setcomments] = useState([]);
    useEffect(() => {
        let unsubscribe;
        unsubscribe = db.collection("posts").doc(props.match.params.postId).collection("comments").orderBy('timestamp','desc')
        .onSnapshot( (snapshot) => {
          Setcomments(snapshot.docs.map( (doc) => doc.data()));
        })
        return () => unsubscribe();    
    })
    return (
        <div className='postCommentsWrapper'>
        <div className='postCommentsWrapper__container'>
        <div className='postCommentsWrapper__container__left'>
          <img src={props.location.post.imageUrl} alt=""/>
        </div>
              
        <div className='postCommentsWrapper__container__right'>

        <div className='postCommentsWrapper__container__right__header'>
         <div className='postCommentsWrapper__container__right__header__top'>
          <Link to={`/myProfile/${props.location.post.username}/${props.location.post.userId}`} >
          <Avatar className='post__avatar' alt={props.location.post.username}  src={ !!props.location.postUserImage ? props.location.postUserImage:" " } /></Link>
          <h4><Link to={`/myProfile/${props.location.post.username}/${props.location.post.userId}`} >{props.location.post.username}</Link></h4>
          </div>
          <p>{props.location.post.caption}</p>
          <p><strong>{props.location.likes}</strong> Likes</p>
          </div>
          <div className='postCommentsWrapper__container__right__comments'>
            <p className='postCommentsWrapper__container__right__comments__heading'>Comments</p>
                    {
            comments.length ? 
                comments.map( (comment) => (
                   ( <p key={Math.random()} >
                      <Link to={`/myProfile/${comment.username}/${comment.userId}`} ><strong>{comment.username}</strong></Link> {comment.text}
                    </p>)
    
                )):<div className='postCommentsWrapper__container__right__comments__no'>No Comments</div>
              }
              </div>
              </div>
              </div>
        <p className='postCommentsWrapper__container__bottom'>&copy; 2021 Insta-Clone By Tanish Gupta</p>
        </div>
    )
}

export default PostComments;

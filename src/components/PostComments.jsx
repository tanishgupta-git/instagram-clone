import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Spinner from './Spinner';
import { db } from '../Firebase';
import { Link } from 'react-router-dom';
import './PostComments.css';

function PostComments({props}) {
    const [comments,Setcomments] = useState([]);
    const [loading,Setloading] = useState(false);
    useEffect(() => {
      Setloading(true);
        let unsubscribe;
        setTimeout(() => unsubscribe = db.collection("posts").doc(props.match.params.postId).collection("comments").orderBy('timestamp','desc')
        .onSnapshot( (snapshot) => {
          Setcomments(snapshot.docs.map( (doc) => doc.data()));
          Setloading(false);
        }),1500)
        return () => unsubscribe();    
    },[Setloading,props.match.params.postId])
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
          <p><Link className='postComments__user' to={`/myProfile/${props.location.post.username}/${props.location.post.userId}`} >{props.location.post.username}</Link></p>
          </div>
          <p>{props.location.post.caption}</p>
          <p className='postComments__likes'>{props.location.likes} Likes</p>
          </div>
          <div className='postCommentsWrapper__container__right__comments'>
            <p className='postCommentsWrapper__container__right__comments__heading'>Comments</p>
            { loading && <Spinner />}
                    {
            comments.length ? 
                comments.map( (comment) => (
                   ( <p key={Math.random()} >
                      <Link className='postComments__user' to={`/myProfile/${comment.username}/${comment.userId}`} >{comment.username}</Link> {comment.text}
                    </p>)
    
                )):(!loading && <div className='postCommentsWrapper__container__right__comments__no'>No Comments</div>)
              }
              </div>
              </div>
              </div>
        <p className='postCommentsWrapper__container__bottom'>&copy; 2021 Insta-Clone By Tanish Gupta</p>
        </div>
    )
}

export default PostComments;

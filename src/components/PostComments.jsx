import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Spinner from './Spinner';
import { db } from '../Firebase';
import { Link } from 'react-router-dom';
import './PostComments.css';

function PostComments({props}) {
    const [comments,Setcomments] = useState([]);
    const [post,Setpost] = useState();
    const [loading,Setloading] = useState(false);
    const [postsLoading,SetpostsLoading] = useState(true);
    const [likes,Setlikes] = useState(0);
    useEffect(() => {
      Setloading(true);
        let unsubscribe;
        setTimeout(() => unsubscribe = db.collection("posts").doc(props.match.params.postId).collection("comments").orderBy('timestamp','desc')
        .onSnapshot( (snapshot) => {
          Setcomments(snapshot.docs.map( (doc) => doc.data()));
          Setloading(false);
        }),1500)
        return () => unsubscribe();    
    },[Setloading,props.match.params.postId]);
    useEffect(() => {
       db.collection('posts').doc(props.match.params.postId).collection('likes').get().then( snapshot => Setlikes(snapshot.docs.length))
    },[props.match.params.postId])
    useEffect(() => {
      SetpostsLoading(true);
     db.collection("posts").doc(props.match.params.postId).get().then( function(doc) {
       Setpost(doc.data());
     }).then( () => SetpostsLoading(false))

    },[props.match.params.postId])
    return (
        <div className='postCommentsWrapper'>
         { postsLoading ? <Spinner /> :
        <div className='postCommentsWrapper__container'>
        <div className='postCommentsWrapper__container__left'>
         { !postsLoading ?  <img src={post.imageUrl} alt=""/> : <Spinner /> }
        </div>
              
        <div className='postCommentsWrapper__container__right'>
        <div className='postCommentsWrapper__container__right__header'>
         <div className='postCommentsWrapper__container__right__header__top'>
          <Link to={`/myProfile/${post.username}/${post.userId}`} >
          <Avatar className='post__avatar' alt={post.username}  src={ !!post.userImgurl ? post.userImgurl:" " } /></Link>
          <p><Link className='postComments__user' to={`/myProfile/${post.username}/${post.userId}`} >{post.username}</Link></p>
          </div>
          <p>{post.caption}</p>
          <p className='postComments__likes'>{likes} Likes</p>
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
         }
        <p className='postCommentsWrapper__container__bottom'>&copy; 2021 Insta-Clone By Tanish Gupta</p>
        </div>
    )
}

export default PostComments;

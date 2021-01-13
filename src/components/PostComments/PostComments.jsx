import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Spinner from '../Spinner/Spinner';
import { db } from '../../Firebase';
import { RiAddCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

import './PostComments.css';

function PostComments({props,SetopenPop,Setloading}) {
    const [comments,Setcomments] = useState([]);
    const [post,Setpost] = useState();
    const [commentsLoading,SetcommentsLoading] = useState(false);
    const [noMorecomments,SetnoMorecomments] = useState(false);
    const [lastComment,SetlastComment] = useState('');
    const [isLoading,SetisLoading] = useState(false);
    const [postsLoading,SetpostsLoading] = useState(true);
    const [likes,Setlikes] = useState(0);
     
    useEffect(() => {
      SetopenPop(false);
      Setloading(false);
  },[SetopenPop,Setloading])
    // fetching the post comments from firebase database
    useEffect(() => {
      SetisLoading(true);
        let unsubscribe;
        setTimeout(() => unsubscribe = db.collection("posts").doc(props.match.params.postId).collection("comments").orderBy('timestamp','desc').limit(10)
        .onSnapshot( (snapshot) => {
          if(!snapshot.docs.length) SetnoMorecomments(true);
          Setcomments(snapshot.docs.map( (doc) =>
          ({ id:doc.id,
            data:doc.data() }) ));
          SetlastComment(snapshot.docs[snapshot.docs.length -1]);
          SetisLoading(false);
        }),1500)
        return () => unsubscribe();    
    },[SetisLoading,props.match.params.postId]);

    // setting up the likes count from firebase
    useEffect(() => {
       db.collection('posts').doc(props.match.params.postId).collection('likes').get().then( snapshot => Setlikes(snapshot.docs.length))
    },[props.match.params.postId])
    useEffect(() => {
      SetpostsLoading(true);
     db.collection("posts").doc(props.match.params.postId).get().then( function(doc) {
       Setpost(doc.data());
     }).then( () => SetpostsLoading(false))

    },[props.match.params.postId])
    
    const LoadMore = () => {
      SetnoMorecomments(false);
       SetcommentsLoading(true);
       db.collection("posts").doc(props.match.params.postId).collection("comments").orderBy('timestamp','desc').startAfter(lastComment).limit(10).get()
       .then( snapshot => {
         if(!snapshot.docs.length) return snapshot;
        if( lastComment.id === snapshot.docs[snapshot.docs.length - 1].id) return snapshot; 
        Setcomments(prevState => [...prevState,...(snapshot.docs.map( doc => ({
           id:doc.id,
           data:doc.data()
         })))])
        
         return snapshot;
       }).then((snapshot) =>   {
        if(!snapshot.docs.length){ 
          SetnoMorecomments(true);
          return;
        }
         if(!(lastComment.id === snapshot.docs[snapshot.docs.length - 1].id))  SetlastComment(snapshot.docs[snapshot.docs.length -1 ]) })
       .then(() => SetcommentsLoading(false)) 
    
      }
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
          <Link to={`/profile/${post.username}/${post.userId}`} >
          <Avatar className='post__avatar' alt={post.username}  src={ !!post.userImgurl ? post.userImgurl:" " } /></Link>
          <p><Link className='postComments__user' to={`/profile/${post.username}/${post.userId}`} >{post.username}</Link></p>
          </div>
          <p>{post.caption}</p>
          <p className='postComments__likes'>{likes} Likes</p>
          </div>
          <div className='postCommentsWrapper__container__right__comments'>
            <p className='postCommentsWrapper__container__right__comments__heading'>Comments</p>
            { isLoading && <Spinner />}
               <div>
               {comments.map( (comment) => (
                   ( <p key={comment.id} >
                      <Link className='postComments__user' to={`/profile/${comment.data.username}/${comment.data.userId}`} >{comment.data.username}</Link> {comment.data.text}
                    </p>)
              
                ))}<div className='postCommentsWrapper__container__right__comments__loadmore' >{commentsLoading  ? <Spinner />: ( !noMorecomments &&<RiAddCircleLine onClick={LoadMore}/>) }</div></div> 
                {noMorecomments && <div className='postCommentsWrapper__container__right__comments__no'>No More Comments</div>}
              </div>
              </div>
              </div>
         }
        <p className='postCommentsWrapper__container__bottom'>&copy; 2021 Insta-Clone By Tanish Gupta</p>
        </div>
    )
}

export default PostComments;
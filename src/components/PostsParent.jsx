import React from 'react'
import ImageUpload from './ImageUpload';
import Posts from './Posts';

function PostsParent({posts,user}) {
    return (
      <div className='Posts'>
        <div className='app__posts'>
        <div className='app__postsLeft'>
          { 
            posts.map( ({id,post}) => {
              return  (
                <Posts key={id} postId = {id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
              )
            })
          }
          </div>         
          </div>
         {  user && <ImageUpload username={user.displayName}/> }
          </div>
    )
}

export default PostsParent

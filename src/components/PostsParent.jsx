import React from 'react'
import Posts from './Posts';

function PostsParent({posts,user}) {
    return (
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
    )
}

export default PostsParent

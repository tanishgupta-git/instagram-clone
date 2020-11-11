import React,{useState,useEffect} from 'react'
import Header from './Header';
import { db} from '../Firebase';
import PostsParent from './PostsParent';

function HomePage({user}) {
    const [posts,Setposts] = useState([]);
    //   fetching the post from firebase
  useEffect(() => {
    // runs every time when post chnages
    db.collection('posts').orderBy('timeStamp','desc').onSnapshot( snapshot => {
      Setposts(snapshot.docs.map(doc => ({
        id:doc.id,
        post:doc.data()
      })))

    })

  },[])

    return (
        <div>
        <Header user={user}/>
        <PostsParent user={user} posts={posts} />
        </div>
    )
}

export default HomePage

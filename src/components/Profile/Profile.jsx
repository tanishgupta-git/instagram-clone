import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Profile.css';
import {db} from '../../Firebase';
import  Spinner from '../Spinner/Spinner';

function Profile({props,SetopenPop,user}) {
    const [userData,SetuserData] = useState({});
    const [isLoading,SetisLoading] = useState(true);
    useEffect(() => {
        SetopenPop(false);  
    },[SetopenPop])
    useEffect(() => {
      SetisLoading(true);
    //    creating a user document in users collection if it doesn't exits it will initialize it 
       db.collection('users').doc(props.match.params.userId).get().then(function(doc) {
        if (doc.exists) {
            SetuserData(doc.data());
            SetisLoading(false);
         
        } else {
         // Add a new document in collection users
             db.collection("users").doc(props.match.params.userId).set({
                username: props.match.params.username,
                name:"",
                imageUrl:"",
                bio:"",
                website:"",
                profession:"",
                email:""
            })
            .then(() => {
            SetisLoading(false);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    
        }
    }).catch(function(error) {
        console.log("Error getting user:", error);
    });
    },[props.match.params.userId,props.match.params.username])
    return (
        <div className='myProfile'>
        { isLoading ? <Spinner /> :
        <div className='myProfile__flex'>
          { !!userData.imageUrl ?<div className='myProfile__image'> <img src={userData.imageUrl} alt=""/></div>:<div className='myProfile__noimage'> No Image Yet</div>}
           <div className='myProfile__intro'>
              <p className='myProfile__intro__username'>{userData.username}</p>
             {user.uid === props.match.params.userId ? <Link className='myProfile__intro__edit' to={{pathname:`${props.history.location.pathname}/edit`,userData:userData}}>Edit Profile</Link> : ""}
              <p className='myProfile__intro__name'>{userData.name}</p>
              <p className='myProfile__intro__profession'>{userData.profession}</p>
              <p className='myProfile__intro__bio'>{userData.bio}</p>
              <p className='myProfile__intro__website'><a href={`/${userData.website}`} target='blank'>{userData.website}</a></p>
              <p className='myProfile__intro__email'>{userData.email}</p>
           </div>
           </div>
        }
         { user.uid === props.match.params.userId ?  <p className='myProfile__intro__updated'>Keep Your Profile Updated So That Visitors Get To Know More About You</p>:"" }
           <p className='myProfile__copyright'>&copy; 2021 InstaClone By Tanish Gupta</p>
        </div>
    )
}

export default Profile;
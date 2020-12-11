import React,{useEffect, useState} from 'react';
import {db} from '../Firebase';
import {Link} from 'react-router-dom';
import  Spinner from './Spinner';
import './MyProfile.css';

function MyProfile({props,SetopenPop,user}) {
    const [userData,SetuserData] = useState({});
    const [isLoading,SetisLoading] = useState(true);
    useEffect(() => {
        SetopenPop(false);  
    },[SetopenPop])
    useEffect(() => {
       let unsubscribeOne ;
       let  unsubscribeTwo;
    //    creating a user document in users collection if it doesn't exits it will initialize it 
       unsubscribeOne = db.collection('users').doc(props.match.params.userId).get().then(function(doc) {
        if (doc.exists) {
            SetuserData(doc.data());
            SetisLoading(false);
            return () => {
                unsubscribeOne();
             };
        } else {
        // Add a new document in collection users
            unsubscribeTwo = db.collection("users").doc(props.match.params.userId).set({
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
            return () => {
                unsubscribeTwo();
            }

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
           <p className='myProfile__copyright'>&copy; 2020 InstaClone By Tanish Gupta</p>
        </div>
    )
}

export default MyProfile;
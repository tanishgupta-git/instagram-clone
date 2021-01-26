import React,{useEffect, useState,useContext} from 'react';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import './Profile.css';
import {db} from '../../firebase/Firebase';
import  Spinner from '../Spinner/Spinner';
import { LoadingContext } from '../../contexts/loadingContext';
import { PopUpContext } from '../../contexts/PopUpContext';

function Profile({match,history,user}) {
    const [userData,SetuserData] = useState({});
    const [isLoading,SetisLoading] = useState(true);
    const {Setloading} = useContext(LoadingContext);
    const {SetopenPop} = useContext(PopUpContext);
    useEffect(() => {
        SetopenPop(false);
        Setloading(false);
    },[SetopenPop,Setloading])
    
    useEffect(() => {
      SetisLoading(true);
    //    creating a user document in users collection if it doesn't exits it will initialize it 
       db.collection('users').doc(match.params.userId).get().then(function(doc) {
        if (doc.exists) {
            SetuserData(doc.data());
            SetisLoading(false);
         
        }
    }).catch(function(error) {
        console.log("Error getting user:", error);
    });
    },[match.params.userId,match.params.username])
    return (
        <div className='myProfile'>
        { isLoading ? <Spinner /> :
        <div className='myProfile__flex'>
          { !!userData.imageUrl ?<div className='myProfile__image'> <img src={userData.imageUrl} alt=""/></div>:<div className='myProfile__noimage'> No Image Yet</div>}
           <div className='myProfile__intro'>
              <p className='myProfile__intro__username'>{userData.username}</p>
             { user.uid === match.params.userId ? <Link className='myProfile__intro__edit' to={{pathname:`${history.location.pathname}/edit`,userData:userData}}>Edit Profile</Link> : ""}
              <p className='myProfile__intro__name'>{userData.name}</p>
              <p className='myProfile__intro__profession'>{userData.profession}</p>
              <p className='myProfile__intro__bio'>{userData.bio}</p>
              <p className='myProfile__intro__website'><a href={`/${userData.website}`} target='blank'>{userData.website}</a></p>
              <p className='myProfile__intro__email'>{userData.email}</p>
           </div>
           </div>
        }
         { user.uid === match.params.userId ?  <p className='myProfile__intro__updated'>Keep Your Profile Updated So That Visitors Get To Know More About You</p>:"" }
           <p className='myProfile__copyright'>&copy; 2021 InstaClone By Tanish Gupta</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user : state.user.user
  })

export default connect(mapStateToProps)(withRouter(Profile));
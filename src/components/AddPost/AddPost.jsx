import React,{useState,useEffect,useContext} from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {storage,db} from '../../firebase/Firebase';
import { RiAddCircleLine } from "react-icons/ri"; 
import { BsUpload } from "react-icons/bs";
import {withRouter} from 'react-router-dom';
import { LoadingContext } from '../../contexts/loadingContext';
import { PopUpContext } from '../../contexts/PopUpContext';
import './AddPost.css';
import { createStructuredSelector } from 'reselect';
import { userSelector } from '../../redux/user/user.selectors';

function AddPost({history,user}) {
   const [caption,Setcaption]  = useState('');
   const [image,Setimage] = useState(null);
   const [error,Seterror] = useState(null);
   const [userImgurl,Setuserimgurl] = useState('');
   const [progress,Setprogress] = useState(0);
   const [uploading,Setuploading] = useState(false);
   const types = ['image/png','image/jpeg','image/jpg'];
   const {Setloading} = useContext(LoadingContext);
   const {SetopenPop} = useContext(PopUpContext);

   const handleChange = (e) => {
    let selected = e.target.files[0];
    if(selected && types.includes(selected.type)){
         Setimage(selected);
         Seterror('');
    }else{
        Setimage(null);
       Seterror('Please select an image of type png,jpeg,jpg'); 
    }
   }
//    setting the popup to false
useEffect(() => {
    SetopenPop(false);
    Setloading(false);
},[SetopenPop,Setloading])
   useEffect(() => {
    let unsubscribe = db.collection('users').doc(user.uid).get().then( function(doc) {
     if (doc.exists) {
         Setuserimgurl(doc.data().imageUrl);
     }else{
         Setuserimgurl("");
     } 
     return () => unsubscribe();
  }) },[user.uid])
   const handleUpload = () => {
       if(!image) {
           Seterror("All Fields Are Required");
           return;
       }
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
          "state_changed",
          (snapshot) => {
            //   progress function
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
            Setprogress(progress);
          },
          (error) => {
              console.log(error);
              alert(error);
          },
          () => {
            Setuploading(true);
              storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then( url => {
                  db.collection('posts').add({
                      timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
                      caption:caption, 
                      imageUrl:url,
                      userImgurl:userImgurl,
                      username:user.username,
                      userId:user.uid
                  });
                  Setprogress(0);
                  Setcaption(" ");
                  Setimage(null);
                  history.push('/home');
              })
          }
      )
   }
    return (
      <div className='imageUpload'>
            <h2><RiAddCircleLine />  Add New Post</h2>
            <label className='imageUpload__label' htmlFor='progress'>Progress:</label>
            <progress  id='progress' className='imageUpload__progress' value={progress} max="100"/>

            <label className='imageUpload__label' htmlFor='caption'>Caption:</label>
            <input type='text' id='caption'  onChange={(e)=> Setcaption(e.target.value) } required/>

        <p><strong>Choose a file</strong> (click the icon)</p>
         <label className='imageUpload__fileUploader'>
           <input type='file' onChange={handleChange} />
           <BsUpload />
           </label> 
           
            { image && <div><strong>Selected Image Name</strong> { image.name }</div> }
            { error && <div className="imageUpload__error">{ error }</div>}
            <button onClick={handleUpload} disabled={uploading}>Upload</button>

        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    user : userSelector
  })
export default withRouter(connect(mapStateToProps)(AddPost));

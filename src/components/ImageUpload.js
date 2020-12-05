import React,{useState,useEffect} from 'react'
import {storage,db} from '../Firebase';
import firebase from 'firebase';
import './ImageUpload.css';
import { RiAddCircleLine } from "react-icons/ri"; 
import { BsUpload } from "react-icons/bs";
function ImageUpload({username,SetopenPop}) {
   const [caption,Setcaption]  = useState('');
   const [image,Setimage] = useState(null);
   const [error,Seterror] = useState(null);
   const [progress,Setprogress] = useState(0);
   const types = ['image/png','image/jpeg','image/jpg'];
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
   },[SetopenPop])
   const handleUpload = () => {
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
              storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then( url => {
                  db.collection('posts').add({
                      timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
                      caption:caption, 
                      imageUrl:url,
                      username:username
                  });
                  Setprogress(0);
                  Setcaption(" ");
                  Setimage(null);
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
            <input type='text' id='caption'  onChange={(e)=> Setcaption(e.target.value) }/>

           <p><strong>Choose a file</strong> (click the icon)</p>

           <label className='imageUpload__fileUploader'>
           <input type='file' onChange={handleChange} />
           <BsUpload />
           </label> 

            { image && <div>{ image.name }</div> }
            { error && <div className="imageUpload__error">{ error }</div>}
            <button onClick={handleUpload}>Upload</button>

        </div>
    )
}

export default ImageUpload

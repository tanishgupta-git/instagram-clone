import { Button } from '@material-ui/core'
import React,{useState} from 'react'
import {storage,db} from '../Firebase';
import firebase from 'firebase';
import './ImageUpload.css';

function ImageUpload({username}) {
   const [caption,Setcaption]  = useState('');
   const [image,Setimage] = useState(null);
   const [progress,Setprogress] = useState(0);

   const handleChange = (e) => {
       if(e.target.files[0]) {
           Setimage(e.target.files[0]);
       }
   }
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
            <progress  className='imageUpload__progress' value={progress} max="100"/>
            <input type='text' placeholder='Enter a caption...' onChange={(e)=> Setcaption(e.target.value) }/>
            <input type='file' onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>

        </div>
    )
}

export default ImageUpload

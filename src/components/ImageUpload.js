import React,{useState} from 'react'
import {storage,db} from '../Firebase';
import firebase from 'firebase';
import './ImageUpload.css';

function ImageUpload({username}) {
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
            <p>Add Post</p>
            <progress  className='imageUpload__progress' value={progress} max="100"/>
            <input type='text' placeholder='Enter a caption...' onChange={(e)=> Setcaption(e.target.value) }/>
            <input type='file' onChange={handleChange} />
            { image && <div>{ image.name }</div> }
            { error && <div className="imageUpload__error">{ error }</div>}
            <button onClick={handleUpload}>Upload</button>

        </div>
    )
}

export default ImageUpload

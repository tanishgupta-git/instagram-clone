import React,{useState,useEffect} from 'react';
import {storage,db} from '../Firebase';
import './EditProfile.css';

function EditProfile({props,user,SetopenPop}) {
    useEffect(() => {
     SetopenPop(false);
    },[SetopenPop])
    const userData = props.location.userData;
    const types = ['image/png','image/jpeg','image/jpg'];
    const [error,Seterror] = useState(null);
    const [imageUploading,SetimageUploading] = useState(false);
    const [progress,Setprogress] = useState(0);
    const [name,Setname] = useState(userData.name);
    const [bio,Setbio] = useState(userData.bio);
    const [website,Setwebsite] = useState(userData.website);
    const [profession,Setprofession] = useState(userData.profession);
    const [email,Setemail] = useState(userData.email);
    const [updating,Setupdating] = useState(false);
    const handleChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);
      if(selected && types.includes(selected.type)){
           Seterror('');
           SetimageUploading(true);
           handleUpload(selected);
      }else{
         Seterror('Please select an image of type png,jpeg,jpg'); 
      }
     }
     const handleUpload = (selected) => {
      const uploadTask = storage.ref(`userprofileimages/${selected.name}`).put(selected);
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
            .ref("userprofileimages")
            .child(selected.name)
            .getDownloadURL()
            .then( url => {
                db.collection('users').doc(user.uid).update({
                    imageUrl:url,
                });
                Setprogress(0);
                SetimageUploading(false);
                props.history.push(`/myprofile/${userData.username}/${props.match.params.userId}`)
            })
        }
      )
   }

   const handleSubmit = (e) => {
     e.preventDefault();
     Setupdating(true);
     db.collection('users').doc(user.uid).update({
       name:name,
       bio:bio,
       website:website,
       profession:profession,
       email:email
     }).then(() => props.history.push(`/myprofile/${userData.username}/${props.match.params.userId}`))
   }
    return (
        <div className='editProfile'>
          <h3>Edit Profile</h3>

          <form className='editProfile__form' onSubmit={handleSubmit}>
           <p className='editProfile__form__error'>{error}</p>
          <div className='editProfile__form__userInfo'>
           <div className='editProfile__form__userInfo__userimage'>
          { !!props.location.userData.imageUrl ? <img src={props.location.userData.imageUrl} alt=""/> : <span>No Image Yet</span>}
          </div>
          <div>
          <p className='editProfile__form__userInfo__username'>{props.match.params.username}</p>
       
        {/* image uploading task */}
     
        {imageUploading ?<span>Updating ... <progress value={progress} max="100" /></span>:<label className='editProfile__form__userInfo__changeImage'><input type='file' onChange={handleChange}/>Change Profile Image</label>}
        </div>
          </div>
          <p className='editProfile__form__mutedtext'>You can't change your username 
          </p>
          <div className='editProfile__form__Inputdiv'>    
          <label className='editProfile__form__Inputdiv__label'>Name:</label>
          <input className='editProfile__form__Inputdiv__input' type='text' value={name} placeholder='Name' 
            onChange={(e) => Setname(e.target.value)}
          />
          </div>
          <p className='editProfile__form__mutedtext'>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>


          <div className='editProfile__form__Inputdiv'>
            <label className='editProfile__form__Inputdiv__label'>Bio:</label>
            <textarea  className='editProfile__form__Inputdiv__textarea' value={bio} placeholder='Bio' rows='4' 
              onChange={(e) => Setbio(e.target.value)}
            />
          </div>

          <div className='editProfile__form__Inputdiv'>
            <label className='editProfile__form__Inputdiv__label'>Website:</label>
            <input  className='editProfile__form__Inputdiv__input' type='text' value={website} placeholder='Website' 
                 onChange={(e) => Setwebsite(e.target.value)}
            />
          </div>

          <div className='editProfile__form__Inputdiv'>
            <label className='editProfile__form__Inputdiv__label'>Profession:</label>
            <input  className='editProfile__form__Inputdiv__input' type='text' value={profession} placeholder='Profession' 
                 onChange={(e) => Setprofession(e.target.value)}
            />
          </div>

          <div className='editProfile__form__Inputdiv'>
            <label className='editProfile__form__Inputdiv__label'>Email:</label>
            <input  className='editProfile__form__Inputdiv__input' type='email' value={email} placeholder='Email' 
                 onChange={(e) => Setemail(e.target.value)}
            />
          </div>

          <p className='editProfile__form__mutedtext'>Give a proper email id so that people can contact with you if that want</p>
        
          <button className='editProfile__form__submit' type='submit'>{updating ? <div className='editProfile__form__submit__spinner'></div>:"Submit" }</button>
          </form> 
        </div>
    )
}

export default EditProfile;

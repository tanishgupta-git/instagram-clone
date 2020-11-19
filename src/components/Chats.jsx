import React,{useState,useEffect} from 'react';
import { db } from '../Firebase';
import firebase from 'firebase';
import { BsChat } from "react-icons/bs";
import './Chats.css';

function Chats({user}) {
    const [chats,Setchats] = useState([]);
    const [message,Setmessage] = useState('');
    // fetching all the chats from firebase
    useEffect( () => {
        let unsubscribe;
        unsubscribe= db.collection('chats').orderBy('timestamp','asc').onSnapshot( snapshot => { 
            Setchats(snapshot.docs.map( doc => ({
                id:doc.id,
                chat:doc.data()
            })
            ))
        })

        return ( () => unsubscribe())
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('chats').add({
          userId:user.uid,
          username:user.displayName,
          message:message,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()
        }).then( () => Setmessage(''))
    }
    return (
        <div className='chats'>
        <h2 className='chats__heading'><BsChat /> Insta-clone Chat Room</h2>
         { chats.map( chat => chat.chat.userId === user.uid ? (
             <div  key={chat.id} className="chat__userParent">
             <div  className='chat__user'>
             <span className='chat__username'>You</span>
            { chat.chat.message}
         </div>
         </div>):(
             <div key={chat.id} className="chat__otherParent">
             <div  className='chat__other'>
             <span className='chat__username'>{chat.chat.username}</span>
              { chat.chat.message}
             </div>
             </div>
         ) )}

        <div className='chat__formparent'>
         <form className='chat__form' onSubmit={handleSubmit} >
           <input placeholder='Type a message' onChange={ (e) => Setmessage(e.target.value)} required value={message}/>
           <button type='submit'><strong>Send</strong></button>
         </form>
         </div>

        </div>
    )
}

export default Chats;
 
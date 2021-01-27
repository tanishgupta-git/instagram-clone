import React,{useState} from 'react';
import { connect } from 'react-redux';
import { db } from '../../firebase/Firebase';
import firebase from 'firebase';
import './Chatform.css';
import { createStructuredSelector } from 'reselect';
import { userSelector } from '../../redux/user/user.selectors';

function Chatform({user}) {
    const [message,Setmessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('chats').add({
          userId:user.uid,
          username:user.username,
          message:message,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()
        }).then( 
            () => 
            Setmessage('')
            )
    }
    return (
        <div className='chat__formparent'>
        <form className='chat__form' onSubmit={handleSubmit} >
          <input placeholder='Type a message' onChange={ (e) => Setmessage(e.target.value)} required value={message}/>
          <button type='submit'><strong>Send</strong></button>
        </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
  user : userSelector
})

export default connect(mapStateToProps)(Chatform);

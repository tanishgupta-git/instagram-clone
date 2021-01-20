import React from 'react';
import {Link} from 'react-router-dom';
import './Chat.css';

function Chat({chat,self}) {
    return (
        <div className={self ? "chat chat__user" : "chat chat__other"}>
          { !self &&  <span className='chat__username'><Link to={`/profile/${chat.chat.username}/${chat.chat.userId}`}>{chat.chat.username}</Link></span> }
           { chat.chat.message}
        </div>
    )
}

export default Chat;

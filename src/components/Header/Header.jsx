import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Avatar from '@material-ui/core/Avatar';
import { db,auth } from '../../Firebase';
import { FaRegUserCircle} from "react-icons/fa";
import { RiHome2Line,RiHome2Fill,RiAddCircleLine,RiSendPlaneFill,RiSendPlaneLine } from "react-icons/ri";

function Header({user,openPop,SetopenPop,chatsClick,homeClick}) {
  const [userImg,SetuserImg] = useState('');
  // fetching the user imageUrl
  useEffect(() => {
    db.collection('users').doc(user.uid).onSnapshot(function(doc) {
     if(doc.exists) {
      SetuserImg(doc.data().imageUrl);
     }else {
       SetuserImg("");
     }
  })
  })
    return (
        <div className='header'>
          <div className='header__main'>
            <Link to='/home'><img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/></Link>
              <span className='header__popupParent'>
              <Link to='/home'>{homeClick ?<RiHome2Fill className='header__popupParentIcon' /> :<RiHome2Line className='header__popupParentIcon'/> }</Link>
              <Link to='/chats'>{ chatsClick ? <RiSendPlaneFill className='header__popupParentIcon' /> 
              : <RiSendPlaneLine className='header__popupParentIcon'/>} </Link>

              <span className={openPop ?  'header__avatarContainer header__avatarContainerClick' :'header__avatarContainer' } onClick={ 
                () => SetopenPop( prev => !prev)}><Avatar className='header__avatarContainer__avatar' alt={user.displayName} src={userImg}/> </span>
              { openPop && <div className='header__popup'>
              <Link to={`/profile/${user.displayName}/${user.uid}`} ><FaRegUserCircle className='header__popupIcon'/> My Profile</Link>
              <Link to='/addpost'><RiAddCircleLine className='header__popupIcon' /> Add New Post</Link>
              <span className='header__logout' onClick={() => auth.signOut()}>Logout</span>
              </div> }
              </span>
          </div>
      </div>
    )
}

export default Header;

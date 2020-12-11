import React from 'react'
import { auth} from '../Firebase';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaRegUserCircle,FaBars} from "react-icons/fa";
import { RiHome2Line,RiHome2Fill,RiAddCircleLine,RiSendPlaneFill,RiSendPlaneLine } from "react-icons/ri";
function Header({user,openPop,SetopenPop,chatsClick,homeClick}) {
    return (
        <div className='header'>
        <div className='header__main'>
       <Link to='/home'><img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/></Link>
        <span className='header__popupParent'>
        <Link to='/home'>{homeClick ?<RiHome2Fill className='header__popupParentIcon' /> :<RiHome2Line className='header__popupParentIcon'/> }</Link>
        <Link to='/chats'>{ chatsClick ? <RiSendPlaneFill className='header__popupParentIcon' /> 
        : <RiSendPlaneLine className='header__popupParentIcon'/>} </Link>
        <span onClick={ () => SetopenPop( prev => !prev)}><FaBars className='header__popupParentIcon'/></span>
        { openPop && <div className='header__popup'>
        <Link to={`/myprofile/${user.displayName}/${user.uid}`} ><FaRegUserCircle className='header__popupIcon'/> My Profile</Link>
        <Link to='/addpost'><RiAddCircleLine className='header__popupIcon' /> Add New Post</Link>
        <span className='header__logout' onClick={() => auth.signOut()}>Logout</span>
        </div> }
        </span>
        </div>
      </div>
    )
}

export default Header

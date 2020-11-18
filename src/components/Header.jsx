import React,{useState} from 'react'
import { auth} from '../Firebase';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaRegUserCircle,FaBars} from "react-icons/fa";
import { RiHome2Line,RiSendPlaneLine } from "react-icons/ri";
function Header({user}) {
  const [openPop,SetopenPop] = useState(false);
    return (
        <div className='header'>
        <div className='header__main'>
       <a href='/'><img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/></a>
        <span className='header__popupParent'>
        <Link to='/home'><RiHome2Line className='header__popupParentIcon'/></Link>
        <Link to='/chats'><RiSendPlaneLine className='header__popupParentIcon'/></Link>
        <span onClick={ () => SetopenPop( prev => !prev)}><FaBars className='header__popupParentIcon'/></span>
        { openPop && <div className='header__popup'>
        <Link to='/myprofile'><FaRegUserCircle className='header__popupIcon'/> My Profile</Link>
        <span onClick={() => auth.signOut()}>Logout</span>
        </div> }
        </span>
        </div>
      </div>
    )
}

export default Header

import React from 'react';
import  { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import Avatar from '@material-ui/core/Avatar';
import { FaRegUserCircle} from "react-icons/fa";
import { RiHome2Line,RiHome2Fill,RiAddCircleLine,RiSendPlaneFill,RiSendPlaneLine } from "react-icons/ri";
import { createStructuredSelector } from 'reselect';
import { userSelector } from '../../redux/user/user.selectors';
import { hidePopupSelector } from '../../redux/hidePopup/hidePopup.selectors';
import { setHidePopup } from '../../redux/hidePopup/hidePopup.actions.js';
import { signOutStart } from '../../redux/user/user.actions.js';

function Header({signOutStart,hidePopup,setHidePopup,user,chatsClick,homeClick}) {
    return (
        <div className='header'>
          <div className='header__main'>
            <Link to='/'><img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/></Link>
              <span className='header__popupParent'>
              <Link to='/'>{homeClick ?<RiHome2Fill className='header__popupParentIcon' /> :<RiHome2Line className='header__popupParentIcon'/> }</Link>
              <Link to='/chats'>{ chatsClick ? <RiSendPlaneFill className='header__popupParentIcon' /> 
              : <RiSendPlaneLine className='header__popupParentIcon'/>} </Link>

              <span className={hidePopup ?  'header__avatarContainer header__avatarContainerClick' :'header__avatarContainer' } onClick={ 
                () => setHidePopup(!hidePopup)}><Avatar className='header__avatarContainer__avatar' alt={user.username} src={user.imageUrl === "" ? " " : user.imageUrl}/> </span>
              { hidePopup && <div className='header__popup'>
              <Link to={`/profile/${user.username}/${user.uid}`} ><FaRegUserCircle className='header__popupIcon'/> My Profile</Link>
              <Link to='/addpost'><RiAddCircleLine className='header__popupIcon' /> Add New Post</Link>
              <span className='header__logout' onClick={() => signOutStart()}>Logout</span>
              </div> }
              </span>
          </div>
      </div>
    )
}

const mapStateToProps = createStructuredSelector({
  user : userSelector,
  hidePopup :hidePopupSelector 
})

const mapDispatchToProps = dispatch => ({
  setHidePopup : userCond => dispatch(setHidePopup(userCond)),
  signOutStart : () => dispatch(signOutStart())
})
export default connect(mapStateToProps,mapDispatchToProps)(Header)
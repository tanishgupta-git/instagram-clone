import React,{useContext} from 'react';
import  { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import Avatar from '@material-ui/core/Avatar';
import { auth } from '../../firebase/Firebase';
import { FaRegUserCircle} from "react-icons/fa";
import { RiHome2Line,RiHome2Fill,RiAddCircleLine,RiSendPlaneFill,RiSendPlaneLine } from "react-icons/ri";
import { PopUpContext } from '../../contexts/PopUpContext';

function Header({user,chatsClick,homeClick}) {
  const {openPop,SetopenPop} = useContext(PopUpContext);
    return (
        <div className='header'>
          <div className='header__main'>
            <Link to='/'><img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/></Link>
              <span className='header__popupParent'>
              <Link to='/'>{homeClick ?<RiHome2Fill className='header__popupParentIcon' /> :<RiHome2Line className='header__popupParentIcon'/> }</Link>
              <Link to='/chats'>{ chatsClick ? <RiSendPlaneFill className='header__popupParentIcon' /> 
              : <RiSendPlaneLine className='header__popupParentIcon'/>} </Link>

              <span className={openPop ?  'header__avatarContainer header__avatarContainerClick' :'header__avatarContainer' } onClick={ 
                () => SetopenPop( prev => !prev)}><Avatar className='header__avatarContainer__avatar' alt={user.username} src={user.imageUrl === "" ? " " : user.imageUrl}/> </span>
              { openPop && <div className='header__popup'>
              <Link to={`/profile/${user.username}/${user.uid}`} ><FaRegUserCircle className='header__popupIcon'/> My Profile</Link>
              <Link to='/addpost'><RiAddCircleLine className='header__popupIcon' /> Add New Post</Link>
              <span className='header__logout' onClick={() => auth.signOut()}>Logout</span>
              </div> }
              </span>
          </div>
      </div>
    )
}

const mapStateToProps = state => ({
   user : state.user.user
})
export default connect(mapStateToProps)(Header);
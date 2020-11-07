import React from 'react'
import { Button} from '@material-ui/core';
import { auth} from '../Firebase';
function Header({user,Setopen,SetopenSignIn}) {
    return (
        <div className='app__header'>
        <div className='header'>
       <a href='/'><img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/></a>
        { user ? (<Button onClick={() => auth.signOut()}>Logout</Button>):
       <div className='app__loginContainer'>
        <Button onClick={() => SetopenSignIn(true)}>Sign In</Button>
        <Button onClick={ () => Setopen(true)}>Sign Up</Button>
        </div> }
        </div>
      </div>
    )
}

export default Header

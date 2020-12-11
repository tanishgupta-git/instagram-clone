import React,{useState} from 'react'
import { auth} from '../Firebase';
import './SignInAndSignUp.css';

function Signup({username,Setusername}) {
    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");
    const [error,Seterror] = useState("");
    const [loading,Setloading] = useState(false);
    const signUp = (event) => {
        event.preventDefault();
        Setloading(true);
        auth.createUserWithEmailAndPassword(email,password)
        .then( (authUser) => {
          authUser.user.updateProfile({
            displayName:username
          })
        })
        .catch( (error) => { Seterror(error.message);Setloading(false) })
       } 
     
    return (
        <div>
            {/* sign up model */}
      
    <div className='Sign'>
      <form className='Sign__form'>
        <center>
        <img className='Sign__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/>
        </center>
   
        <input placeholder='Username' className='app__signInput' type='text' value={username} onChange={(e) => Setusername(e.target.value)} />      
        <input placeholder='Email' className='app__signInput' type='text' value={email} onChange={(e) => Setemail(e.target.value)} />
        <input placeholder='Password' className='app__signInput' type='password' value={password} onChange={(e) => Setpassword(e.target.value)} />
        <button type='submit' onClick={signUp}>{loading ?<div className='SignSpinner'></div> :'Sign Up'}</button>
        <p className='Sign__error'>{error}</p> 
      </form>
    </div>
      {/* end of sign up model */}

        </div>
    )
}

export default Signup;
import React,{useState} from 'react'
import { auth} from '../Firebase';

function Signin({SetopenSignup}) {

    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .catch((error) => Seterror(error.message) )
      }
    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");
    const [error,Seterror] = useState("");
    return (
        <div>
          
{/* login model */}
    <div  className='Sign'> 
      <form className='Sign__form'>
        <center>
        <img className='Sign__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/>
        </center>    
        <input placeholder='Email' className='app__signInput' type='text' value={email} onChange={(e) => Setemail(e.target.value)} />
        <input placeholder='Password' className='app__signInput' type='password' value={password} onChange={(e) => Setpassword(e.target.value)} />
        <button type='submit' onClick={signIn}>Log In </button>
        <p className='Sign__error'>{error}</p> 
      </form>
      <p>Don't have an account? <span style={{ color:'blue',cursor:'pointer'}} onClick={ () => SetopenSignup(true)}>Sign up!</span></p>
    </div>
      {/* end of login model */}  
        </div>
    )
}

export default Signin

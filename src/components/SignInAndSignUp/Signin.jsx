import React,{useState} from 'react'
import { auth} from '../../firebase/Firebase';
import './SignInAndSignUp.css';

function Signin({SetopenSignup}) {


    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");
    const [error,Seterror] = useState("");
    const [loading,Setloading] = useState(false);

    const signIn = (event) => {
      Setloading(true);
      event.preventDefault();
      auth.signInWithEmailAndPassword(email,password)
      .catch((error) => {Seterror(error.message); Setloading(false)})
    }
    return (
        <div>
          
{/* login model */}
    <div  className='Sign'> 
      <form className='Sign__form'>
        <center>
        <h1 className='Sign__form___logo'>Instagram</h1>
        </center>    
        <input placeholder='Email' className='app__signInput' type='text' value={email} onChange={(e) => Setemail(e.target.value)} />
        <input placeholder='Password' className='app__signInput' type='password' value={password} onChange={(e) => Setpassword(e.target.value)} />
        <button type='submit' onClick={signIn} disabled={loading}>{loading ? <div className='SignSpinner'></div>:'Log In'}</button>
        <p className='Sign__error'>{error}</p> 
      </form>
      <p>Don't have an account? <span style={{ color:'blue',cursor:'pointer'}} onClick={ () => SetopenSignup(true)}>Sign up!</span></p>
    </div>
      {/* end of login model */}  
        </div>
    )
}

export default Signin;
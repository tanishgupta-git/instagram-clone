import React,{useState} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadingSelector,errorSelector} from '../../redux/user/user.selectors';
import  { signUpStart } from '../../redux/user/user.actions';
import './SignInAndSignUp.css';

function Signup({loading,error,signUpStart}) {
    const [username,Setusername] = useState("");
    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");

    const signUp = (event) => {
        event.preventDefault();
        signUpStart({email,password,username});
       } 
     
    return (
        <div>
            {/* sign up model */}
      
    <div className='Sign'>
      <form className='Sign__form'>
        <center>
        <h1 className='Sign__form___logo'>Instagram</h1>
        </center>
   
        <input placeholder='Username' className='app__signInput' type='text' value={username} onChange={(e) => Setusername(e.target.value)} />      
        <input placeholder='Email' className='app__signInput' type='text' value={email} onChange={(e) => Setemail(e.target.value)} />
        <input placeholder='Password' className='app__signInput' type='password' value={password} onChange={(e) => Setpassword(e.target.value)} />
        <button type='submit' onClick={signUp} disabled={loading} >{loading ?<div className='SignSpinner'></div> :'Sign Up'}</button>
        <p className='Sign__error'>{error.message}</p> 
      </form>
    </div>
      {/* end of sign up model */}

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
  loading : loadingSelector,
  error : errorSelector
})
const mapDispatchToProps = dispatch => ({
  signUpStart : (userData) => dispatch(signUpStart(userData))
})

export default connect(mapStateToProps,mapDispatchToProps)(Signup);  
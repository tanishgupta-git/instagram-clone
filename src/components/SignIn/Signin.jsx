import React,{useState} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadingSelector,errorSelector} from '../../redux/user/user.selectors';
import  { signInStart } from '../../redux/user/user.actions';

function Signin({loading,error,signInStart,SetopenSignup}) {
    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");
    const signIn = (event) => {
      event.preventDefault();
      signInStart({email,password});
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
        <p className='Sign__error'>{error.message}</p> 
      </form>
      <p>Don't have an account? <span style={{ color:'blue',cursor:'pointer'}} onClick={ () => SetopenSignup(true)}>Sign up!</span></p>
    </div>
      {/* end of login model */}  
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
  loading : loadingSelector,
  error : errorSelector
})
const mapDispatchToProps = dispatch => ({
  signInStart : (emailAndPassword) => dispatch(signInStart(emailAndPassword))
})
export default connect(mapStateToProps,mapDispatchToProps)(Signin);
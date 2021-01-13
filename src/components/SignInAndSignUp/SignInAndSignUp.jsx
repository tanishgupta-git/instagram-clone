import React,{useState} from 'react'
import Signup from './Signup';
import Signin from './Signin';
import './SignInAndSignUp.css';
import SignSvg from '../../static/loginsvg.svg';

function SignInAndSignUp({username,Setusername}) {
    const [openSignUp,SetopenSignup] = useState(false);
    return (
      <div className='SignInSignUp__Parent'>
        <div className='SignInSignUp'>
    <div className='SignInSignUp__body'>
      <div className='SignInSignUp__left'>
        <h1>Spreding happiness by creating</h1>
        <img className='SignInSignUp__left_svg' src={SignSvg} alt=''/>
        </div>
    <div className='SignInSignUp__right'> 
    { openSignUp ? 
      ( <Signup  username={username} Setusername={Setusername} />) : (<Signin SetopenSignup={SetopenSignup} />) }
      </div> 
      </div>
    <div className='SignInSignUp__fotter'>
       <p>&copy; 2021 Insta-Clone Developed by Tanish Gupta</p>
       </div>
        </div>
        </div>
    )
}

export default SignInAndSignUp;
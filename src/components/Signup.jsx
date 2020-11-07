import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { auth} from '../Firebase';
import { Button, Input } from '@material-ui/core';
function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Signup({open,Setopen,username,Setusername}) {
    const classes = useStyles();
    const [email,Setemail] = useState("");
    const [modalStyle] = React.useState(getModalStyle);
    const [password,Setpassword] = useState("");
    const signUp = (event) => {
        event.preventDefault();
     
        auth.createUserWithEmailAndPassword(email,password)
        .then( (authUser) => {
          authUser.user.updateProfile({
            displayName:username
          })
        })
        .catch( (error) => alert(error.message))
        Setopen(false);
       } 
     
    return (
        <div>
            {/* sign up model */}
          <Modal
        open={open}
        onClose={() => Setopen(false)}
       >
    <div style={modalStyle} className={ `${classes.paper}  app__signParent`}>
      <form className='app__signup'>
        <center>
        <img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/>
        </center>
   
        <Input placeholder='username' className='app__signInput' type='text' value={username} onChange={(e) => Setusername(e.target.value)} />      
        <Input placeholder='email' className='app__signInput' type='text' value={email} onChange={(e) => Setemail(e.target.value)} />
        <Input placeholder='password' className='app__signInput' type='password' value={password} onChange={(e) => Setpassword(e.target.value)} />
        <Button type='submit' onClick={signUp}>Sign Up</Button> 
      </form>
    </div>
      </Modal>
      {/* end of sign up model */}

        </div>
    )
}

export default Signup


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
      width:280,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Signin({openSignIn,SetopenSignIn}) {
    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .catch((error) => alert(error.message))
        SetopenSignIn(false);
      }
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");
    return (
        <div>
          
{/* login model */}
<Modal
 open={openSignIn}
        onClose={() => SetopenSignIn(false)}
       >
           <div style={modalStyle} className={classes.paper}>
      <form className='app__signup'>
        <center>
        <img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png ' alt=''/>
        </center>    
        <Input placeholder='email' className='app__signInput' type='text' value={email} onChange={(e) => Setemail(e.target.value)} />
        <Input placeholder='password' className='app__signInput' type='password' value={password} onChange={(e) => Setpassword(e.target.value)} />
        <Button type='submit' onClick={signIn}>Sign In</Button> 
      </form>
    </div>
      </Modal>
      {/* end of login model */}  
        </div>
    )
}

export default Signin

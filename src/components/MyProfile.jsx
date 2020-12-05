import React,{useEffect} from 'react'
import './MyProfile.css';

function MyProfile({SetopenPop}) {
    useEffect(() => {
        SetopenPop(false);  
    },[SetopenPop])
    return (
        <div>
        instagram-clone web app is under production so you may see update of this page aftersometime
        </div>
    )
}

export default MyProfile;

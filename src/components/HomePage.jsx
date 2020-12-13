import React,{useState} from 'react'
import Header from './Header';
import PostsParent from './PostsParent';
import { Switch,Route } from 'react-router-dom';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import Chats from './Chats';
import ImageUpload from './ImageUpload';
import PostComments from './PostComments';
import './HomePage.css';
import Loading from '../static/Loading.gif';

function HomePage({props,user}) {
    const [loading,Setloading] = useState(true);
    const [openPop,SetopenPop] = useState(false);
    const [homeClick,SethomeClick] = useState(false);
    const [chatsClick,SetchatsClick] = useState(false);


    return (  
        <div className='HomePage' style={{width:'100%',height:'100%'}}>
        {loading && <div className='loading'><img src={Loading} alt=''/></div>}
        <Header user={user} openPop={openPop} SetopenPop={SetopenPop} homeClick={homeClick} chatsClick={chatsClick}/>
        <Switch>
        <Route path='/home' render={ (props) => <PostsParent {...props} user={user} Setloading={Setloading} SetopenPop={SetopenPop} SethomeClick={SethomeClick} /> } />
        <Route exact path='/myprofile/:username/:userId' render={(props) => <MyProfile props={props} user={user} SetopenPop={SetopenPop} /> } />
        <Route path='/myprofile/:username/:userId/edit' render={(props) => <EditProfile props={props} user={user} SetopenPop={SetopenPop} /> } />
        <Route path='/chats' render={ (props) => <Chats {...props} user={user} SetopenPop={SetopenPop} SetchatsClick={SetchatsClick} /> } />
        <Route path='/p/:postId' render={ (props) => <PostComments props={props} SetopenPop={SetopenPop} /> } />
        <Route path='/addpost' render={ (props) => <ImageUpload  props={props} user={user} SetopenPop={SetopenPop} />} />
        </Switch>
        </div>
    )
}

export default HomePage

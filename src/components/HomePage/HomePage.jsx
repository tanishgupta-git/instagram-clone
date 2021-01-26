import React,{useState,useContext} from 'react'
import Header from '../Header/Header'
import Posts from '../Posts/Posts';
import { Switch,Route } from 'react-router-dom';
import Profile from '../Profile/Profile';
import EditProfile from '../EditProfile/EditProfile';
import ChatRoom from '../ChatRoom/ChatRoom';
import AddPost from '../AddPost/AddPost';
import PostComments from '../PostComments/PostComments';
import './HomePage.css';
import Loading from '../../static/Loading.gif';
import {LoadingContext} from '../../contexts/loadingContext';

function HomePage() {
    const {loading} = useContext(LoadingContext)
    const [homeClick,SethomeClick] = useState(false);
    const [chatsClick,SetchatsClick] = useState(false);

    return ( 
            <div className='HomePage'>
            {loading && <div className='loading'><img src={Loading} alt=''/></div>}
            <Header homeClick={homeClick} chatsClick={chatsClick}/>
            <Switch>
            <Route exact path='/' render= { () => <Posts  SethomeClick={SethomeClick} /> } />
            <Route exact path='/profile/:username/:userId' render={() => <Profile /> } />
            <Route exact path='/profile/:username/:userId/edit' render={() => <EditProfile /> } />
            <Route exact path='/chats' render={ () => <ChatRoom SetchatsClick={SetchatsClick} /> } />
            <Route exact path='/p/:postId' render={ () => <PostComments /> } />
            <Route exact path='/addpost' render={ () => <AddPost />} />
            </Switch>
            </div>
    )
}

export default HomePage;
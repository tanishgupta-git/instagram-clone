import React,{useState} from 'react'
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
        <Route exact path='/' render={ () => <Posts  user={user} Setloading={Setloading} SetopenPop={SetopenPop} SethomeClick={SethomeClick} /> } />
        <Route exact path='/profile/:username/:userId' render={() => <Profile  Setloading={Setloading} user={user} SetopenPop={SetopenPop} /> } />
        <Route exact path='/profile/:username/:userId/edit' render={() => <EditProfile user={user} Setloading={Setloading} SetopenPop={SetopenPop} /> } />
        <Route exact path='/chats' render={ () => <ChatRoom user={user} SetopenPop={SetopenPop} Setloading={Setloading} SetchatsClick={SetchatsClick} /> } />
        <Route exact path='/p/:postId' render={ () => <PostComments Setloading={Setloading} SetopenPop={SetopenPop} /> } />
        <Route exact path='/addpost' render={ () => <AddPost user={user} Setloading={Setloading} SetopenPop={SetopenPop} />} />
        </Switch>
        </div>
    )
}

export default HomePage;
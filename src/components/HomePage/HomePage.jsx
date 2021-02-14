import React,{useState,lazy,Suspense} from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header'
import { Switch,Route } from 'react-router-dom';
import './HomePage.css';
import { createStructuredSelector } from 'reselect';
import { loadingSelector } from '../../redux/loading/loading.selectors';
import Spinner from '../Spinner/Spinner';

const Posts = lazy(() => import('../Posts/Posts'));
const Profile = lazy(() => import('../Profile/Profile'));
const EditProfile = lazy(() => import('../EditProfile/EditProfile'));
const ChatRoom = lazy(() => import('../ChatRoom/ChatRoom'));
const AddPost = lazy(() => import('../AddPost/AddPost'));
const PostComments = lazy(() => import('../PostComments/PostComments'));

function HomePage({loading}) {
    const [homeClick,SethomeClick] = useState(false);
    const [chatsClick,SetchatsClick] = useState(false);

    return ( 
            <div className='HomePage'>
            {loading && <div className='loading'><Spinner centerPage /></div>}
            <Header homeClick={homeClick} chatsClick={chatsClick}/>
            <Switch>
            <Suspense fallback={ <Spinner centerPage/>}>
            <Route exact path='/' render= { () => <Posts  SethomeClick={SethomeClick} /> } />
            <Route exact path='/profile/:username/:userId' render={() => <Profile /> } />
            <Route exact path='/profile/:username/:userId/edit' render={() => <EditProfile /> } />
            <Route exact path='/chats' render={ () => <ChatRoom SetchatsClick={SetchatsClick} /> } />
            <Route exact path='/p/:postId' render={ () => <PostComments /> } />
            <Route exact path='/addpost' render={ () => <AddPost />} />
            </Suspense>
            </Switch>
            </div>
    )
}

const mapStateToProps = createStructuredSelector({
    loading : loadingSelector
})
export default connect(mapStateToProps)(HomePage);
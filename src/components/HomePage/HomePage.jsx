import React,{useState,lazy,Suspense} from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header'
import { Switch,Route} from 'react-router-dom';
import './HomePage.css';
import { createStructuredSelector } from 'reselect';
import { loadingSelector } from '../../redux/loading/loading.selectors';
import Spinner from '../Spinner/Spinner';
import { errorSelector } from '../../redux/user/user.selectors';

const Posts = lazy(() => import('../Posts/Posts'));
const Profile = lazy(() => import('../Profile/Profile'));
const EditProfile = lazy(() => import('../EditProfile/EditProfile'));
const ChatRoom = lazy(() => import('../ChatRoom/ChatRoom'));
const AddPost = lazy(() => import('../AddPost/AddPost'));
const PostComments = lazy(() => import('../PostComments/PostComments'));
const Page404 = lazy(() => import('../Page404/Page404'));

function HomePage({loading}) {
    const [homeClick,SethomeClick] = useState(false);
    const [chatsClick,SetchatsClick] = useState(false);
    throw Error;
    return ( 
            <div className='HomePage'>
            {loading && <div className='loading'><Spinner centerPage /></div>}
            <Header homeClick={homeClick} chatsClick={chatsClick}/>
            <Suspense fallback={ <Spinner centerPage/>}>
            <Switch>
            <Route exact path='/' render= { () => <Posts  SethomeClick={SethomeClick} /> } />
            <Route exact path='/profile/:username/:userId' render={() => <Profile /> } />
            <Route exact path='/profile/:username/:userId/edit' render={() => <EditProfile /> } />
            <Route exact path='/chats' render={ () => <ChatRoom SetchatsClick={SetchatsClick} /> } />
            <Route exact path='/p/:postId' render={ () => <PostComments /> } />
            <Route exact path='/addpost' render={ () => <AddPost />} />
            <Route component={Page404} />     
            </Switch>
            </Suspense>
            </div>
    )
}

const mapStateToProps = createStructuredSelector({
    loading : loadingSelector
})
export default connect(mapStateToProps)(HomePage);
import React,{useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import { db } from '../../firebase/Firebase';
import { BsChat } from "react-icons/bs";
import './ChatRoom.css';
import Spinner from '../Spinner/Spinner';
import Chat from '../Chat/Chat';
import Chatform from '../Chatform/Chatform';
import { createStructuredSelector } from 'reselect';
import { setLoading } from '../../redux/loading/loading.actions.js';
import { userSelector } from '../../redux/user/user.selectors';
import { setHidePopup } from '../../redux/hidePopup/hidePopup.actions.js';
import { chatsSelector, isLoadingSelector, lastFetchSelector } from '../../redux/chats/chats.selectors';
import { setChats,setisLoading,setlastFetch } from '../../redux/chats/chats.actions';

function ChatRoom({chats,setChats,lastFetch,setlastFetch,isLoading,setisLoading,setLoading,setHidePopup,user,SetchatsClick}) {


    const refreDiv = useRef();
    useEffect(() => {
        setHidePopup(false);
        setLoading();
    },[setHidePopup,setLoading])
    useEffect(() => {
       SetchatsClick(true);
       return () => SetchatsClick(false);
    })
    // fetching all the chats from firebase
    useEffect( () => {
        
        let unsubscribe;
        // limiting total messages fetch when load
        unsubscribe = db.collection('chats').orderBy('timestamp','desc').limit(14).onSnapshot( snapshot => { 
            setChats(snapshot.docs.map( doc => ({
                id:doc.id,
                chat:doc.data()
            })
            ).reverse());
            setlastFetch(snapshot.docs[snapshot.docs.length -1]);
            
            refreDiv.current.scrollTop = refreDiv.current.scrollHeight - refreDiv.current.clientHeight;
        })
          
        return ( () => unsubscribe())
    },[setChats,setlastFetch])
    
    const handleScroll  = (e) => {

     if(e.target.scrollTop === 0) {
         setisLoading(true);
     }
    }
    useEffect(
        () => {
        if(!isLoading) return;
        db.collection('chats').orderBy('timestamp','desc').startAfter(lastFetch).limit(14).get().then(snapshot => {
            if(snapshot.docs.length && lastFetch.id === snapshot.docs[snapshot.docs.length - 1].id) return snapshot;
            setChats([...(snapshot.docs.map(doc => ({id:doc.id,chat:doc.data()}) ).reverse()),...chats]);
            return snapshot;
        }).then( (snapshot) => {if(snapshot.docs.length && !(lastFetch.id === snapshot.docs[snapshot.docs.length - 1].id)) setlastFetch(snapshot.docs[snapshot.docs.length - 1])})
        .then(() => { setisLoading(false)})

    },[isLoading,setChats,lastFetch,setlastFetch,chats,setisLoading])
    return (
    <div className='chatsParent'>
        <div className='chats' ref={refreDiv} onScroll={handleScroll}>
        <h2 className='chats__heading'><BsChat /> Insta-clone Chat Room</h2>
        { isLoading && <Spinner /> }
         { chats.map
         ( 
             chat => chat.chat.userId === user.uid ? (
                 <div className='chat__Userparent' key={chat.id} ><Chat chat={chat} self/></div>)
         :
         (<div className='chat__Otherparent' key={chat.id}> <Chat chat={chat}/></div>) 
         )
         
         }

         <Chatform />
        </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user : userSelector,
    chats : chatsSelector,
    lastFetch : lastFetchSelector,
    isLoading : isLoadingSelector
  })

const mapDispatchToProps = dispatch => ({
    setLoading : () => dispatch(setLoading()),
    setHidePopup : userCond => dispatch(setHidePopup(userCond)),
    setChats : chats => dispatch(setChats(chats)),
    setlastFetch : doc => dispatch(setlastFetch(doc)),
    setisLoading : bolValue => dispatch(setisLoading(bolValue))
  })

export default connect(mapStateToProps,mapDispatchToProps)(ChatRoom);
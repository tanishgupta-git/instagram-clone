import React,{useState,useEffect,useRef,useContext} from 'react';
import { db } from '../../Firebase';
import { BsChat } from "react-icons/bs";
import './ChatRoom.css';
import Spinner from '../Spinner/Spinner';
import { LoadingContext } from '../../contexts/loadingContext';
import { PopUpContext } from '../../contexts/PopUpContext';
import Chat from '../Chat/Chat';
import Chatform from '../Chatform/Chatform';

function ChatRoom({user,SetchatsClick}) {
    const [chats,Setchats] = useState([]);
    const [lastfetch,Setlastfetch] = useState();
    const [isLoading,SetisLoading] = useState(false);
    const {Setloading} = useContext(LoadingContext);
    const {SetopenPop} = useContext(PopUpContext);

    const refreDiv = useRef();
    useEffect(() => {
        SetopenPop(false);
        Setloading(false);
    },[SetopenPop,Setloading])
    useEffect(() => {
       SetchatsClick(true);
       return () => SetchatsClick(false);
    })
    // fetching all the chats from firebase
    useEffect( () => {
        
        let unsubscribe;
        // limiting total messages fetch when load
        unsubscribe = db.collection('chats').orderBy('timestamp','desc').limit(14).onSnapshot( snapshot => { 
            Setchats(snapshot.docs.map( doc => ({
                id:doc.id,
                chat:doc.data()
            })
            ).reverse());
            Setlastfetch(snapshot.docs[snapshot.docs.length -1]);
            
            refreDiv.current.scrollTop = refreDiv.current.scrollHeight - refreDiv.current.clientHeight;
        })
          
        return ( () => unsubscribe())
    },[])
    
    const handleScroll  = (e) => {

     if(e.target.scrollTop === 0) {
         SetisLoading(true);
     }
    }
    useEffect(() => {
        if(!isLoading) return;
        setTimeout ( () => db.collection('chats').orderBy('timestamp','desc').startAfter(lastfetch).limit(14).get().then(snapshot => {
            if(snapshot.docs.length && lastfetch.id === snapshot.docs[snapshot.docs.length - 1].id) return snapshot;
            Setchats(prevState => [...(snapshot.docs.map(doc => ({id:doc.id,chat:doc.data()}) ).reverse()),...prevState]);
            return snapshot;
        }).then( (snapshot) => {if(snapshot.docs.length && !(lastfetch.id === snapshot.docs[snapshot.docs.length - 1].id)) Setlastfetch(snapshot.docs[snapshot.docs.length - 1])})
        .then(() => { SetisLoading(false)}),1500)

    },[isLoading,lastfetch])
    return (
    <div className='chatsParent'>
        <div className='chats' ref={refreDiv} onScroll={handleScroll}>
        <h2 className='chats__heading'><BsChat /> Insta-clone Chat Room</h2>
        { isLoading && <Spinner /> }
         { chats.map
         ( 
             chat => chat.chat.userId === user.uid ? (
                 <div className='chat__Userparent'><Chat key={chat.id} chat={chat} self/>
                 </div>)
         :
         (<div className='chat__Otherparent'> <Chat key={chat.id} chat={chat}/></div>) 
         )}

         <Chatform user={user}/>
        </div>
        </div>
    )
}

export default ChatRoom;
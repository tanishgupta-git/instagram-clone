import { ChatsActionTypes } from './chats.types';
const INITIAL_STATE = {
    chats : [],
    lastFetch : "",
    isLoading : false
}

const chatReducer = (state=INITIAL_STATE,action) => {
    switch(action.type) {
        case ChatsActionTypes.SET_CHATS:
            return {
                ...state,
                chats : action.payload 
            }
        case ChatsActionTypes.SET_LAST_FETCH:
            return {
                ...state,
                lastFetch : action.payload
            }
        case ChatsActionTypes.SET_ISLOADING:
            return {
                ...state,
                isLoading : action.payload
            }
        default:
            return state;
    }
 }

 export default chatReducer;
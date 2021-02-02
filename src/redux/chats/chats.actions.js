import { ChatsActionTypes } from './chats.types';
export const setChats = chats => ({
    type: ChatsActionTypes.SET_CHATS,
    payload: chats 
})

export const setlastFetch = doc => ({
    type : ChatsActionTypes.SET_LAST_FETCH,
    payload : doc
})

export const setisLoading = bolValue => ({
    type : ChatsActionTypes.SET_ISLOADING,
    payload : bolValue
})
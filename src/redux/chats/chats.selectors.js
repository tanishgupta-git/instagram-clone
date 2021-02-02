import  { createSelector } from 'reselect';

const selectChats = state => state.chats;


export const chatsSelector = createSelector(
    [selectChats],
    (chats) => chats.chats  
)

export const lastfetchSelector = createSelector(
    [selectChats],
    (chats) => chats.lastFetch
)

export const isLoadingSelector = createSelector(
    [selectChats],
    (chats) => chats.isLoading
)
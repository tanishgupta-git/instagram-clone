import  { createSelector } from 'reselect';

const selectUser = state => state.user;

export const userSelector = createSelector(
    [selectUser],
    (user) => user.user  
)
import  { createSelector } from 'reselect';

const selectUser = state => state.user;

export const userSelector = createSelector(
    [selectUser],
    (user) => user.user  
)
export const loadingSelector = createSelector(
    [selectUser],
    (user) => user.loading
)

export const errorSelector = createSelector(
    [selectUser],
    (user) => user.error
)
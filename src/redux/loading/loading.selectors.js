import  { createSelector } from 'reselect';

const selectLoading = state => state.loading;

export const loadingSelector = createSelector(
    [selectLoading],
    (loading) => loading.loading 
)
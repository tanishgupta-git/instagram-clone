import  { createSelector } from 'reselect';

const selectHidePopup = state => state.hidePopup;

export const hidePopupSelector = createSelector(
    [selectHidePopup],
    (hidePopup) => hidePopup.hidePopup
)
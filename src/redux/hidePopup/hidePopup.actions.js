import { HidePopupActionTypes } from './hidePopup.types';

export const setHidePopup = (clickCond) => ({
    type: HidePopupActionTypes.SET_HIDEPOPUP,
    payload : clickCond
})

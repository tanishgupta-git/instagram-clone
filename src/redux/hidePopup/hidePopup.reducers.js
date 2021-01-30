import { HidePopupActionTypes } from './hidePopup.types';

const INITIAL_STATE = {
    hidePopup : false
 }
 
 const HidePopupReducer = (state=INITIAL_STATE,action) => {
     switch(action.type) {
         case HidePopupActionTypes.SET_HIDEPOPUP:
             return {
                 ...state,
                 hidePopup : action.payload
             }
         default:
             return state;
     }
  }
  
  export default HidePopupReducer;
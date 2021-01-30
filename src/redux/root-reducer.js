import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import loadingReducer from './loading/loading.reducer';
import HidePopupReducer from './hidePopup/hidePopup.reducers';
export default combineReducers({
    user : userReducer,
    loading : loadingReducer,
    hidePopup : HidePopupReducer
});
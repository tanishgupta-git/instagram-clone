import { UserActionTypes }  from './user.types';
const INITIAL_STATE = {
    user : null,
    error : "",
    loading : false
}
const userReducer = (state=INITIAL_STATE,action) => {
   switch(action.type) {
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_UP_START:
            return {
                ...state,
                loading : true,
                error : ""
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                user : action.payload,
                loading : false,
                error : ""
            }
        case UserActionTypes.SIGN_OUT_SUCCESS: {
            return {
                ...state,
                user : null
            }
        }
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
        {
            return {
                ...state,
                error : action.payload,
                loading : false
            }
        }
       default:
           return state;
   }
}

export default userReducer;
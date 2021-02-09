import { UserActionTypes }  from './user.types';

export const signUpStart = (userData) => ({
  type : UserActionTypes.SIGN_UP_START,
  payload : userData
})

export const signUpSuccess = (user) => ({
    type : UserActionTypes.SIGN_UP_SUCCESS,
    payload : user
})

export const signUpFailure = (err) => ({
  type : UserActionTypes.SIGN_UP_FAILURE,
  payload : err
})

export const signInStart = (emailAndPassword) => ({
    type : UserActionTypes.SIGN_IN_START,
    payload : emailAndPassword
})

export const signInSuccess = (user) => ({
    type : UserActionTypes.SIGN_IN_SUCCESS,
    payload : user
})

export const signInFailure = (err) => ({
    type : UserActionTypes.SIGN_IN_FAILURE,
    payload : err
})

export const signOutStart = () => ({
    type : UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type : UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (err) => ({
    type : UserActionTypes.SIGN_OUT_FAILURE,
    payload : err
})

export const checkUserSession = () => ({
    type : UserActionTypes.CHECK_USER_SESSION
})
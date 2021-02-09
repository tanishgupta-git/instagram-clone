import { UserActionTypes } from "./user.types";
import {takeLatest,put,all,call } from 'redux-saga/effects';
import { auth,createUserProfileDocument,getCurrentUser} from '../../firebase/Firebase';
import { signInSuccess,signInFailure,signOutSuccess,signOutFailure, signUpFailure,signUpSuccess } from './user.actions';

export function* getSnapshotFromUserAuth(userAuth) {
    try {
    const userRef = yield call(createUserProfileDocument,userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess(userSnapshot.data()))
    } catch(err) {
        yield put(signInFailure(err))
    }    
}

export function* signIn({payload : { email,password}}) {
    try {
    const { user} = yield auth.signInWithEmailAndPassword(email,password);
    yield getSnapshotFromUserAuth(user)
    } catch(err) {
        yield put(signInFailure(err))
    }
}

export function* signUp({payload : { email,password,username}}) {
    try {
     const { user } = yield auth.createUserWithEmailAndPassword(email,password);
     yield user.updateProfile({displayName:username});
     yield put(signUpSuccess(user))
    } catch(err) {
        yield put(signUpFailure(err))
    }
}
export function* signOut() {
    try {
       yield auth.signOut();
       yield put(signOutSuccess());
    } catch (err) {
        yield put(signOutFailure(err));
    }
}

export function* signInAfterSignUp({payload}) {
 yield getSnapshotFromUserAuth(payload);
}
export function* isUserAuthenticated() {
   try {
    const userAuth  = yield getCurrentUser();
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
   } catch (err) {
       yield put(signInFailure(err))
   }
}

export function* onSignInStart() {
    yield takeLatest(UserActionTypes.SIGN_IN_START,signIn)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}

export function* onSignUpStart() {
 yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,signInAfterSignUp)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
}

// exporting all sagas as one
export function* userSagas() {
    yield all([
        call(onSignInStart),
        call(onSignOutStart),
        call(onCheckUserSession),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}
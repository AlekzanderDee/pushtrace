import { browserHistory } from 'react-router'
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, take, cancel } from 'redux-saga/effects'

import { BACKEND_API_URI, TOKEN } from '../../utils/settings'
import { ajaxPOST, ajaxDELETE } from '../../utils/ajaxActions'
import  * as actions from '../actions/auth'
import urlMap from '../../utils/urlManager'
import {checkIsAuthenticated} from '../../utils/utils'


// ============= CHECK AUTH STATUS =============
function* checkAuthStatus() {
    yield put(actions.checkAuthStatusAC.success(checkIsAuthenticated()));
}
function* checkAuthStatusWatcher() {
    const watcher = yield takeEvery(actions.CHECK_AUTH_SATUS.REQUEST, checkAuthStatus);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}



// ============= SIGN UP =============
function* signup(action) {
    try {
        const r = yield call(ajaxPOST, {
            url: BACKEND_API_URI+'signup/',
            data: action.data
        });
        yield put(actions.signupAC.success(r.body));
    } catch (error) {
        yield put(actions.signupAC.failure(error));
    }
}
function* signupWatcher() {
    const watcher = yield takeEvery(actions.SIGNUP.REQUEST, signup);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


function signupSuccess(action){
    if (action.response.res_code === 0){
        browserHistory.push(urlMap.signedUp)
    }
}

function* signupSuccessWatcher() {
  const watcher = yield takeEvery(actions.SIGNUP.SUCCESS, signupSuccess);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}



// ============= SIGN IN =============
function* signin(action) {
    try {
        const r = yield call(ajaxPOST, {
            url: BACKEND_API_URI+'signin/',
            data: action.data
        });
        yield put(actions.signinAC.success(r.body));
    } catch (error) {
        put(actions.checkAuthStatusAC.request());
        yield put(actions.signinAC.failure(error));
    }
}
function* signinWatcher() {
    const watcher = yield takeEvery(actions.SIGNIN.REQUEST, signin);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


function* signinSuccess(action){
    localStorage.setItem(TOKEN, action.response.token)
    yield put(actions.checkAuthStatusAC.request());
    browserHistory.push('/')
}

function* signinSuccessWatcher() {
    const watcher = yield takeEvery(actions.SIGNIN.SUCCESS, signinSuccess);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}



// ============= SIGN OUT =============
function* signOut(action) {
    localStorage.removeItem(TOKEN)
    yield put(actions.checkAuthStatusAC.request());
}
function* signOutWatcher() {
    const watcher = yield takeLatest(actions.SIGNOUT, signOut)
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}



// ============= REQUEST PASSWORD RESET =============
function* sendPasswordReset(action) {
    try {
        const r = yield call(ajaxPOST, {
            url: BACKEND_API_URI+'password/reset/',
            data: action.data
        });
        yield put(actions.sendPasswordResetAC.success(r.body));
    } catch (error) {
        yield put(actions.sendPasswordResetAC.failure(error));
    }
}
function* sendPasswordResetWatcher() {
    const watcher = yield takeEvery(actions.SEND_PASSWORD_RESET.REQUEST, sendPasswordReset);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

function* sendPasswordResetSuccess(action) {
    browserHistory.push(urlMap.passwordResetSent)
}
function* sendPasswordResetSuccessWatcher() {
    const watcher = yield takeEvery(actions.SEND_PASSWORD_RESET.SUCCESS, sendPasswordResetSuccess);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}



// ============= SUBMIT PASSWORD RESET =============
function* resetPassword(action) {
    try {
        const passwordResetURL = BACKEND_API_URI+'password/reset/'+action.data.id+'/'+action.data.token
        const r = yield call(ajaxPOST, {
            url: passwordResetURL,
            data: {password1: action.data.password1, password2: action.data.password2}
        });
        yield put(actions.resetPasswordAC.success(r.body));
    } catch (error) {
        yield put(actions.resetPasswordAC.failure(error));
    }
}
function* resetPasswordWatcher() {
    const watcher = yield takeEvery(actions.RESET_PASSWORD.REQUEST, resetPassword);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

function* resetPasswordCompleted(action) {
    if (action.response.res_code === 0 ) {
        browserHistory.push(urlMap.signIn)
    }
}
function* resetPasswordCompletedWatcher() {
    const watcher = yield takeEvery(actions.RESET_PASSWORD.SUCCESS, resetPasswordCompleted);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


// ============= CHANGE PASSWORD =============
function* changePassword(action) {
    try {
        const r = yield call(ajaxPOST, {
            url: BACKEND_API_URI+'account/change_password/',
            data: action.data
        });
        yield put(actions.changePasswordAC.success(r.body));
    } catch (error) {
        yield put(actions.changePasswordAC.failure(error));
    }
}
function* changePasswordWatcher() {
    const watcher = yield takeLatest(actions.CHANGE_PASSWORD.REQUEST, changePassword);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}



// ============= DELETE ACCOUNT =============
function* deleteAccount(action) {
    try {
        const r = yield call(ajaxDELETE, {
            url: BACKEND_API_URI+'account/',
            data: action.data
        });
        yield put(actions.deleteAccountAC.success(r.body));
    } catch (error) {
        yield put(actions.deleteAccountAC.failure(error));
    }
}
function* deleteAccountWatcher() {
    const watcher = yield takeEvery(actions.DELETE_ACCOUNT.REQUEST, deleteAccount);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


function deleteAccountSuccess(action) {
    if (action.response.res_code === 0 ) {
        localStorage.removeItem(TOKEN)
        location.reload()
    }
}
function* deleteAccountSuccessWatcher() {
    const watcher = yield takeEvery(actions.DELETE_ACCOUNT.SUCCESS, deleteAccountSuccess);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
  checkAuthStatusWatcher,
  signupWatcher,
  signupSuccessWatcher,
  signinWatcher,
  signinSuccessWatcher,
  signOutWatcher,
  sendPasswordResetWatcher,
  sendPasswordResetSuccessWatcher,
  resetPasswordWatcher,
  resetPasswordCompletedWatcher,
  changePasswordWatcher,
  deleteAccountWatcher,
  deleteAccountSuccessWatcher
];

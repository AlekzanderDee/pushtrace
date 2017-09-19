import { browserHistory } from 'react-router'
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, take, cancel } from 'redux-saga/effects'

import { BACKEND_API_URI, TOKEN } from '../../utils/settings'
import { ajaxPOST, ajaxGET } from '../../utils/ajaxActions'
import  * as actions from '../actions/user'


// ============= GET_USER_INFO =============
function* getUserInfo(action) {
    try {
        const r = yield call(ajaxGET, {
            url: BACKEND_API_URI+'users/',
        });
        yield put(actions.getUserInfoAC.success(r.body));
    } catch (error) {
        yield put(actions.getUserInfoAC.failure(error));
    }
}
function* getUserInfoWatcher() {
    const watcher = yield takeEvery(actions.GET_USER_INFO.REQUEST, getUserInfo);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


// ============= POST_USER_INFO =============
function* postUserInfo(action) {
    try {
        const r = yield call(ajaxPOST, {
            url: BACKEND_API_URI+'users/',
            data: action.data
        });
        yield put(actions.postUserInfoAC.success(r.body));
    } catch (error) {
        yield put(actions.postUserInfoAC.failure(error));
    }
}
function* postUserInfoWatcher() {
    const watcher = yield takeEvery(actions.POST_USER_INFO.REQUEST, postUserInfo);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


function* postUserInfoSuccess(action){
    yield put(actions.getUserInfoAC.request())
}

function* postUserInfoSuccessWatcher() {
    const watcher = yield takeEvery(actions.POST_USER_INFO.SUCCESS, postUserInfoSuccess);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


export default [
  getUserInfoWatcher,
  postUserInfoWatcher,
  postUserInfoSuccessWatcher
];

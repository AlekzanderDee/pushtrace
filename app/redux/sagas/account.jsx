import { browserHistory } from 'react-router'
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, take, cancel } from 'redux-saga/effects'

import { BACKEND_API_URI, TOKEN } from '../../utils/settings'
import { ajaxPOST, ajaxGET } from '../../utils/ajaxActions'
import  * as actions from '../actions/account'


// ============= GET_ACCOUNT_INFO =============
function* getAccountInfo(action) {
    try {
        const r = yield call(ajaxGET, {
            url: BACKEND_API_URI+'account/',
        });
        yield put(actions.getAccountInfoAC.success(r.body));
    } catch (error) {
        yield put(actions.getAccountInfoAC.failure(error));
    }
}
function* getAccountInfoWatcher() {
    const watcher = yield takeEvery(actions.GET_ACCOUNT_INFO.REQUEST, getAccountInfo);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


export default [
  getAccountInfoWatcher,
];

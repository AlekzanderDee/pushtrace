import { browserHistory } from 'react-router'
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, take, cancel } from 'redux-saga/effects'

import { BACKEND_API_URI } from '../../utils/settings'
import { ajaxPOST } from '../../utils/ajaxActions'
import  * as actions from '../actions/emailConfirmation'


// ============= CONFIRM EMAIL =============
function* confirmEmail(action) {
    try {
        const r = yield call(ajaxPOST, {
            url: BACKEND_API_URI+'confirm_email/',
            data: action.data
        });
        yield put(actions.confirmEmailAC.success(r.body));
    } catch (error) {
        yield put(actions.confirmEmailAC.failure(error));
    }
}
function* confirmEmailWatcher() {
    const watcher =yield takeEvery(actions.CONFIRM_EMAIL.REQUEST, confirmEmail);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


export default [
  confirmEmailWatcher,
];

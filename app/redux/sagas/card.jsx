import { browserHistory } from 'react-router'
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, take, cancel } from 'redux-saga/effects'

import { BACKEND_API_URI, TOKEN } from '../../utils/settings'
import { ajaxPOST, ajaxGET, ajaxDELETE } from '../../utils/ajaxActions'
import  * as actions from '../actions/card'


// ============= GET_CARD_INFO =============
function* getCardInfo(action) {
    try {
        const r = yield call(ajaxGET, {
            url: BACKEND_API_URI+'account/cards/',
        });
        yield put(actions.getCardInfoAC.success(r.body));
    } catch (error) {
        yield put(actions.getCardInfoAC.failure(error));
    }
}
function* getCardInfoWatcher() {
    const watcher = yield takeEvery(actions.GET_CARD_INFO.REQUEST, getCardInfo);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


// ============= ADD_CARD_INFO =============
function* addCardInfo(action) {
    try {
        const r = yield call(ajaxPOST, {
            url: BACKEND_API_URI+'account/cards/',
            data: action.data
        });
        yield put(actions.addCardInfoAC.success(r.body));
    } catch (error) {
        yield put(actions.addCardInfoAC.failure(error));
    }
}
function* addCardInfoWatcher() {
    const watcher = yield takeEvery(actions.ADD_CARD_INFO.REQUEST, addCardInfo);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


function* addCardInfoSuccess(action){
    yield put(actions.getCardInfoAC.request())
}

function* addCardInfoSuccessWatcher() {
    const watcher = yield takeEvery(actions.ADD_CARD_INFO.SUCCESS, addCardInfoSuccess);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

// ============= DELETE_CARD_INFO =============
function* deleteCardInfo(action) {
    try {
        const r = yield call(ajaxDELETE, {
            url: BACKEND_API_URI+'account/cards/'+action.data+'/',
        });
        yield put(actions.deleteCardInfoAC.success(r.body));
    } catch (error) {
        yield put(actions.deleteCardInfoAC.failure(error));
    }
}
function* deleteCardInfoWatcher() {
    const watcher = yield takeEvery(actions.DELETE_CARD_INFO.REQUEST, deleteCardInfo);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


function* deleteCardInfoSuccess(action){
    // update cards information only if delete request succeeded
    if (action.response.res_code === 0) {
        yield put(actions.getCardInfoAC.request())
    }
}

function* deleteCardInfoSuccessWatcher() {
    const watcher = yield takeEvery(actions.DELETE_CARD_INFO.SUCCESS, deleteCardInfoSuccess);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

// ============= SET_DEFAULT_CARD =============
function* setDefaultCard(action) {
    try {
        const r = yield call(ajaxPOST, {
            url: BACKEND_API_URI+'account/cards/set-default/',
            data: action.data
        });
        yield put(actions.setDefaultCardAC.success(r.body));
    } catch (error) {
        yield put(actions.setDefaultCardAC.failure(error));
    }
}
function* setDefaultCardWatcher() {
    const watcher = yield takeEvery(actions.SET_DEFAULT_CARD.REQUEST, setDefaultCard);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


function* setDefaultCardSuccess(action){
    yield put(actions.getCardInfoAC.request())
}

function* setDefaultCardSuccessWatcher() {
    const watcher = yield takeEvery(actions.SET_DEFAULT_CARD.SUCCESS, setDefaultCardSuccess);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


export default [
  getCardInfoWatcher,
  addCardInfoWatcher,
  addCardInfoSuccessWatcher,
  deleteCardInfoWatcher,
  deleteCardInfoSuccessWatcher,
  setDefaultCardWatcher,
  setDefaultCardSuccessWatcher
];

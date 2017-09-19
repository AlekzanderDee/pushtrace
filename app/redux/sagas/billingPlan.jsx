import { LOCATION_CHANGE } from 'react-router-redux';
import { takeEvery } from 'redux-saga'
import { call, put, take, cancel } from 'redux-saga/effects'

import { BACKEND_API_URI, TOKEN } from '../../utils/settings'
import { ajaxPOST, ajaxGET } from '../../utils/ajaxActions'
import  * as actions from '../actions/billingPlan'


// ============= GET_BILLING_PLANS =============
function* getBillingPlans(action) {
    try {
        const r = yield call(ajaxGET, {
            url: BACKEND_API_URI+'plans/',
        });
        yield put(actions.getBillingPlansAC.success(r.body));
    } catch (error) {
        yield put(actions.getBillingPlansAC.failure(error));
    }
}
function* getBillingPlansWatcher() {
    const watcher = yield takeEvery(actions.GET_BILLING_PLANS.REQUEST, getBillingPlans);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


// ============= SUBSCRIBE_TO_BILLING_PLAN =============
function* subscribeToPlan(action) {
    try {
        const r = yield call(ajaxPOST, {
            url: BACKEND_API_URI+'plans/',
            data: action.data
        });
        yield put(actions.subscribeToBillingPlanAC.success(r.body));
    } catch (error) {
        yield put(actions.subscribeToBillingPlanAC.failure(error));
    }
}
function* subscribeToPlanWatcher() {
    const watcher = yield takeEvery(actions.SUBSCRIBE_TO_BILLING_PLAN.REQUEST, subscribeToPlan);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

// update (get) updated information from server after successful POST request
function* subscribeToPlanSuccess(action){
    if (action.response.res_code === 0) {
        yield put(actions.getBillingPlansAC.request())
    }
}

function* subscribeToPlanSuccessWatcher() {
    const watcher = yield takeEvery(actions.SUBSCRIBE_TO_BILLING_PLAN.SUCCESS, subscribeToPlanSuccess);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
  getBillingPlansWatcher,
  subscribeToPlanWatcher,
  subscribeToPlanSuccessWatcher
];

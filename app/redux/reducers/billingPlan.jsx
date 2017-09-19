import { fromJS } from 'immutable';

import {
    GET_BILLING_PLANS,
    SUBSCRIBE_TO_BILLING_PLAN,
} from '../actions/billingPlan'


export default function billingPlan (state=fromJS({
    isProcessing: false,

    payload: {},
    hasErrors: false,
    errors: {},
}), action) {
    switch (action.type) {
        case GET_BILLING_PLANS.REQUEST:
            return state
              .set('isProcessing', true)
              .set('hasErrors', false)
              .set('errors', {});

        case GET_BILLING_PLANS.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('payload', action.response);

        case SUBSCRIBE_TO_BILLING_PLAN.REQUEST:
            return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', {});

        case SUBSCRIBE_TO_BILLING_PLAN.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || {});

          default:
            return state
    }

}

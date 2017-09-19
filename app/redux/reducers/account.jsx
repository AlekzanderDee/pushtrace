import { fromJS } from 'immutable';

import {
    GET_ACCOUNT_INFO,
} from '../actions/account'


export default function account (state=fromJS({
    isProcessing: false,

    payload: {},
    hasErrors: false,
    errors: {},
}), action) {
    switch (action.type) {
        // GET_ACCOUNT_INFO
        case GET_ACCOUNT_INFO.REQUEST:
            return state
              .set('isProcessing', true)
              .set('hasErrors', false)
              .set('errors', {});

        case GET_ACCOUNT_INFO.SUCCESS:
            return state
              .set('isProcessing',false)
              .set('hasErrors', action.response.res_code > 0)
              .set('errors', (action.response.res_code > 0 && action.response.data) || {})
              .set('payload', (action.response.res_code === 0 && action.response.data) || {})
        default:
            return state
    }

}

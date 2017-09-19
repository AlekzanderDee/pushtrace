import { fromJS } from 'immutable';

import {
    GET_USER_INFO,
    POST_USER_INFO
} from '../actions/user'


export default function user (state=fromJS({
    isProcessing: false,

    payload: {},
    hasErrors: false,
    errors: {},
}), action) {
    switch (action.type) {
        case GET_USER_INFO.REQUEST:
            return state
              .set('isProcessing', true)
              .set('hasErrors', false)
              .set('errors', {});

        case GET_USER_INFO.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || {})
                .set('payload', (action.response.res_code === 0 && action.response.data) || {});

        case POST_USER_INFO.REQUEST:
            return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', {});

        case POST_USER_INFO.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || {});
        default:
            return state
    }

}

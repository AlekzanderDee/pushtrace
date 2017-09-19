import { fromJS } from 'immutable';

import {
    CONFIRM_EMAIL,
} from '../actions/emailConfirmation'


export default function emailConfirmation (state=fromJS({
    isProcessing: false,
    message: ''
}), action) {
    switch (action.type) {
        case CONFIRM_EMAIL.REQUEST:
            return state
              .set('isProcessing', true)
              .set('errors', {});

        case CONFIRM_EMAIL.SUCCESS:
            return state
              .set('isProcessing', false)
              .set('message', action.response.data.message || '');

        default:
            return state
    }

}



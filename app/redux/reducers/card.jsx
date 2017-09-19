import { fromJS } from 'immutable';

import {
    GET_CARD_INFO,
    ADD_CARD_INFO,
    DELETE_CARD_INFO,
    SET_DEFAULT_CARD,
} from '../actions/card'


export default function card (state=fromJS({
    isProcessing: false,

    payload: {},
    hasErrors: false,
    errors: [],
}), action) {
    switch (action.type) {
        // GET_CARD_INFO
        case GET_CARD_INFO.REQUEST:
            return state
              .set('isProcessing', true)
              .set('hasErrors', false)
              .set('errors', []);

        case GET_CARD_INFO.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || [])
                .set('payload', (action.response.res_code === 0 && action.response.data) || {});

        // ADD_CARD_INFO
        case ADD_CARD_INFO.REQUEST:
            return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', []);

        case ADD_CARD_INFO.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || []);

        // DELETE_CARD_INFO
        case DELETE_CARD_INFO.REQUEST:
            return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', []);

        case DELETE_CARD_INFO.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || []);

        // SET_DEFAULT_CARD
        case SET_DEFAULT_CARD.REQUEST:
            return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', []);

        case SET_DEFAULT_CARD.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || []);

        default:
            return state
    }

}

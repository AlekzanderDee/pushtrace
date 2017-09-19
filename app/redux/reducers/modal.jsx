import { fromJS } from 'immutable';

import { OPEN_MODAL, CLOSE_MODAL, SET_MODAL_CONTENT } from '../actions/modal'

export default function modal (state=fromJS({isOpen: false, content: null}), action) {
    switch (action.type) {
        case CLOSE_MODAL:
            return state
              .set('isOpen', false);

        case OPEN_MODAL:
            return state
              .set('isOpen', true);

        case SET_MODAL_CONTENT:
            return state
              .set('content', action.content);

        default:
            return state
    }

}

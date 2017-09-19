import { fromJS } from 'immutable';

import { HIDE_NAVBAR, SHOW_NAVBAR } from '../actions/navbar'

export default function navbar (state=fromJS({isVisible: true}), action) {
    switch (action.type) {
        case SHOW_NAVBAR:
            return state
              .set('isVisible', true);

        case HIDE_NAVBAR:
            return state
              .set('isVisible', false);

        default:
            return state
    }

}

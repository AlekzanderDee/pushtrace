import { fromJS } from 'immutable';

import {
    TOGGLE_SIDE_MENU,
    OPEN_SIDE_MENU_STATE,
    CLOSE_SIDE_MENU_STATE,
    SET_MENU_CONTENT,
    REMOVE_MENU_CONTENT,
    TOGGLE_PINNED_MODE,
} from '../actions/sideMenu'

export default function sideMenu (state=fromJS({isOpen: false, isPinned: false, title: '', items: ''}), action) {
    switch (action.type) {

        case TOGGLE_SIDE_MENU:
            if (state.get('items') != '') {
                return state
                  .set('isOpen', !state.get('isOpen'))
            } else {
                console.log('Need to set content before changing the menu state')
                return state
            }

        case OPEN_SIDE_MENU_STATE:
            if (state.get('items') != '') {
                return state
                  .set('isOpen', true);
            } else {
                console.log('Need to set content before changing the menu state')
                return state
            }
        case CLOSE_SIDE_MENU_STATE:
            return state
              .set('isOpen', false)
              .set('isPinned', false);

        case TOGGLE_PINNED_MODE:
            if (state.get('items') != '') {
                const isPinned = !state.get('isPinned')
                let isOpen = state.get('isOpen')

                if (!!isPinned) {
                    isOpen = true
                }
                return state
                  .set('isPinned', isPinned)
                  .set('isOpen', isOpen)
            } else {
                console.log('Need to set content before changing the menu state')
                return state
            }

        case SET_MENU_CONTENT:
            return state
              .set('title', action.title)
              .set('items', action.items);

        case REMOVE_MENU_CONTENT:
            return state
              .set('title', '')
              .set('items', '')
              .set('isOpen', false);

        default:
            return state
    }


}

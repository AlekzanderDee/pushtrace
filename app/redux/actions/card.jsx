import {createRequestTypes, action} from './index'


// GET_CARD_INFO
export const GET_CARD_INFO = createRequestTypes('GET_CARD_INFO')
export const getCardInfoAC = {
    request: () => action(GET_CARD_INFO.REQUEST),
    success: response => action(GET_CARD_INFO.SUCCESS, {response}),
    failure: error => action(GET_CARD_INFO.FAILURE, {error}),
}


// ADD_CARD_INFO
export const ADD_CARD_INFO = createRequestTypes('ADD_CARD_INFO')
export const addCardInfoAC = {
    request: data => action(ADD_CARD_INFO.REQUEST, {data}),
    success: response => action(ADD_CARD_INFO.SUCCESS, {response}),
    failure: error => action(ADD_CARD_INFO.FAILURE, {error}),
}


// DELETE_CARD_INFO
export const DELETE_CARD_INFO = createRequestTypes('DELETE_CARD_INFO')
export const deleteCardInfoAC = {
    request: (data) => action(DELETE_CARD_INFO.REQUEST, {data}),
    success: response => action(DELETE_CARD_INFO.SUCCESS, {response}),
    failure: error => action(DELETE_CARD_INFO.FAILURE, {error}),
}

// SET_DEFAULT_CARD
export const SET_DEFAULT_CARD = createRequestTypes('SET_DEFAULT_CARD')
export const setDefaultCardAC = {
    request: data => action(SET_DEFAULT_CARD.REQUEST, {data}),
    success: response => action(SET_DEFAULT_CARD.SUCCESS, {response}),
    failure: error => action(SET_DEFAULT_CARD.FAILURE, {error}),
}

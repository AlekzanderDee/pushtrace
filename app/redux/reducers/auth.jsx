import { fromJS } from 'immutable';

import {
    SIGNUP,
    CLEAN_AUTH_ERRORS,
    SIGNIN,
    SIGNOUT,
    SEND_PASSWORD_RESET,
    RESET_PASSWORD,
    CHANGE_PASSWORD,
    DELETE_ACCOUNT,
    CHECK_AUTH_SATUS,
} from '../actions/auth'

import {checkIsAuthenticated} from '../../utils/utils'


export default function auth(state = fromJS({
    isAuthenticated: checkIsAuthenticated(),
    isProcessing: false,

    passwordResetCompleted: false,
    passwordResetRequested: false,
    hasErrors: false,
    errors: {},
    payload: {}

}), action) {
    switch (action.type) {
        case CHECK_AUTH_SATUS.SUCCESS:
            return state
              .set('isAuthenticated', action.isAuthenticated);
        // Clean the store
        case CLEAN_AUTH_ERRORS:
            return state
              .set('hasErrors', false)
              .set('errors', {});

        //  Sign Up
        case SIGNUP.REQUEST:
            return state
              .set('isAuthenticated', checkIsAuthenticated())
              .set('isProcessing', true)
              .set('hasErrors', false)
              .set('errors', {});

        case SIGNUP.SUCCESS:
            return state
              .set('isProcessing', false)
              .set('hasErrors', action.response.res_code > 0)
              .set('errors', (action.response.res_code > 0 && action.response.data) || {})
              .set('payload', (action.response.res_code === 0 && action.response.data) || {});

        // Sign In
        case SIGNIN.REQUEST:
            return state
              .set('isProcessing', true);

        case SIGNIN.SUCCESS:
            return state
              .set('isProcessing', false)
              .set('hasErrors', action.response.res_code > 0)
              .set('errors', (action.response.res_code > 0 && action.response.data) || {})
              .set('payload', (action.response.res_code === 0 && action.response.data) || {});

        case SIGNIN.FAILURE:
            return state
              .set('isProcessing', false)
              .set('hasErrors', true)
              .set('errors', action.error.response.body || {})
              .set('payload', {});

        // Sign Out
        case SIGNOUT:
            return state
              .set('isProcessing', false)
              .set('hasErrors', false)
              .set('errors', {})
              .set('payload', {});

        // Request Send Password
        case SEND_PASSWORD_RESET.REQUEST:
            return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', {});

        case SEND_PASSWORD_RESET.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('passwordResetRequested', action.res_code === 0)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || {})
                .set('payload', (action.response.res_code === 0 && action.response.data) || {});

        // Reset Password
        case RESET_PASSWORD.REQUEST:
            return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', {});

        case RESET_PASSWORD.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('passwordResetCompleted', action.res_code === 0)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || {})
                .set('payload', (action.response.res_code === 0 && action.response.data) || {});

        // Change Password
        case CHANGE_PASSWORD.REQUEST:
            return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', {});

        case CHANGE_PASSWORD.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || {})
                .set('payload', (action.response.res_code === 0 && action.response.data) || {});

        // Delete Account
        case DELETE_ACCOUNT.REQUEST:
            return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', {});

        case DELETE_ACCOUNT.SUCCESS:
            return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && action.response.data) || {})
                .set('payload', (action.response.res_code === 0 && action.response.data) || {});

        default:
            return state
    }

}



import { createRequestTypes, action } from './index'

// CHECK AUTH STATUS
export const CHECK_AUTH_SATUS = createRequestTypes('CHECK_AUTH_SATUS')
export const checkAuthStatusAC = {
  request: () => action(CHECK_AUTH_SATUS.REQUEST, {}),
  success: isAuthenticated => action(CHECK_AUTH_SATUS.SUCCESS, {isAuthenticated}),
  failure: error => action(CHECK_AUTH_SATUS.FAILURE, {error}),
}

// CLEAN THE AUTH STORE ERRORS
export const CLEAN_AUTH_ERRORS = 'CLEAN_AUTH_ERRORS'
export const cleanAuthErrorsAC = () => action(CLEAN_AUTH_ERRORS)


// SIGNUP ACTION
export const SIGNUP = createRequestTypes('SIGNUP')
export const signupAC = {
  request: data => action(SIGNUP.REQUEST, {data}),
  success: response => action(SIGNUP.SUCCESS, {response}),
  failure: error => action(SIGNUP.FAILURE, {error}),
}


// SIGNIN ACTION
export const SIGNIN = createRequestTypes('SIGNIN')
export const signinAC = {
  request: data => action(SIGNIN.REQUEST, {data}),
  success: response => action(SIGNIN.SUCCESS, {response}),
  failure: error => action(SIGNIN.FAILURE, {error}),
}


// SIGNOUT ACTION
export const SIGNOUT = 'SIGNOUT'
export const signoutAC = () => action(SIGNOUT)


// SEND_PASSWORD_RESET ACTION
export const SEND_PASSWORD_RESET = createRequestTypes('SEND_PASSWORD_RESET')
export const sendPasswordResetAC = {
  request: data => action(SEND_PASSWORD_RESET.REQUEST, {data}),
  success: response => action(SEND_PASSWORD_RESET.SUCCESS, {response}),
  failure: error => action(SEND_PASSWORD_RESET.FAILURE, {error}),
}


// RESET_PASSWORD ACTION
export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD')
export const resetPasswordAC = {
  request: data => action(RESET_PASSWORD.REQUEST, {data}),
  success: response => action(RESET_PASSWORD.SUCCESS, {response}),
  failure: error => action(RESET_PASSWORD.FAILURE, {error}),
}


// CHANGE_PASSWORD ACTION
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD')
export const changePasswordAC = {
  request: data => action(CHANGE_PASSWORD.REQUEST, {data}),
  success: response => action(CHANGE_PASSWORD.SUCCESS, {response}),
  failure: error => action(CHANGE_PASSWORD.FAILURE, {error}),
}


// DELETE_ACCOUNT ACTION
export const DELETE_ACCOUNT = createRequestTypes('DELETE_ACCOUNT')
export const deleteAccountAC = {
  request: data => action(DELETE_ACCOUNT.REQUEST, {data}),
  success: response => action(DELETE_ACCOUNT.SUCCESS, {response}),
  failure: error => action(DELETE_ACCOUNT.FAILURE, {error}),
}


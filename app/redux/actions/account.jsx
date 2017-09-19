import { createRequestTypes, action } from './index'

// GET_USER_INFO
export const GET_ACCOUNT_INFO = createRequestTypes('GET_ACCOUNT_INFO')
export const getAccountInfoAC = {
  request: data => action(GET_ACCOUNT_INFO.REQUEST, {data}),
  success: response => action(GET_ACCOUNT_INFO.SUCCESS, {response}),
  failure: error => action(GET_ACCOUNT_INFO.FAILURE, {error}),
}

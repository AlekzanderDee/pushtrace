import { createRequestTypes, action } from './index'

// GET_USER_INFO
export const GET_USER_INFO = createRequestTypes('GET_USER_INFO')
export const getUserInfoAC = {
  request: data => action(GET_USER_INFO.REQUEST, {data}),
  success: response => action(GET_USER_INFO.SUCCESS, {response}),
  failure: error => action(GET_USER_INFO.FAILURE, {error}),
}


// POST_USER_INFO
export const POST_USER_INFO = createRequestTypes('POST_USER_INFO')
export const postUserInfoAC = {
  request: data => action(POST_USER_INFO.REQUEST, {data}),
  success: response => action(POST_USER_INFO.SUCCESS, {response}),
  failure: error => action(POST_USER_INFO.FAILURE, {error}),
}

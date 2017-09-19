import { createRequestTypes, action } from './index'

import { BACKEND_API_URI } from '../../utils/settings'


// CONFIRM_EMAIL ACTION
export const CONFIRM_EMAIL = createRequestTypes('CONFIRM_EMAIL')
export const confirmEmailAC = {
  request: data => action(CONFIRM_EMAIL.REQUEST, {data}),
  success: response => action(CONFIRM_EMAIL.SUCCESS, {response}),
  failure: error => action(CONFIRM_EMAIL.FAILURE, {error}),
}

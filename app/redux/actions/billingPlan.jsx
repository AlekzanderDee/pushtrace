import { createRequestTypes, action } from './index'

// GET_BILLING_PLANS
export const GET_BILLING_PLANS = createRequestTypes('GET_BILLING_PLANS')
export const getBillingPlansAC = {
  request: () => action(GET_BILLING_PLANS.REQUEST),
  success: response => action(GET_BILLING_PLANS.SUCCESS, {response}),
  failure: error => action(GET_BILLING_PLANS.FAILURE, {error}),
}


// SUBSCRIBE_TO_BILLING_PLAN
export const SUBSCRIBE_TO_BILLING_PLAN = createRequestTypes('SUBSCRIBE_TO_BILLING_PLAN')
export const subscribeToBillingPlanAC = {
  request: data => action(SUBSCRIBE_TO_BILLING_PLAN.REQUEST, {data}),
  success: response => action(SUBSCRIBE_TO_BILLING_PLAN.SUCCESS, {response}),
  failure: error => action(SUBSCRIBE_TO_BILLING_PLAN.FAILURE, {error}),
}

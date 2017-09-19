import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { auth } from './auth'
import { navbar } from './navbar'
import { emailConfirmation } from './emailConfirmation'
import { user } from './user'
import { modal } from './modal'
import { billingPlan } from './billingPlan'
import { account } from './account'
import { card } from './card'
import { projects } from './projects'
import { sideMenu } from './sideMenu'


const rootReducer = combineReducers({
    auth,
    navbar,
    emailConfirmation,
    user,
    modal,
    billingPlan,
    account,
    card,
    projects,
    sideMenu,
    routing: routerReducer
})

export default rootReducer

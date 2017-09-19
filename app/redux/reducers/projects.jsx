import { fromJS, List, Map } from 'immutable';

import {
    CLEAN_PROJECTS_ERRORS,
    CLEAN_PROJECTS_USERS,
    CREATE_PROJECT,
    GET_PROJECTS,
    GET_PROJECT_DETAILS,
    GET_PROJECT_USERS,
    PROJECT_ADD_USER,
    PROJECT_UPDATE_MEMBERSHIP,
    PROJECT_DELETE_MEMBERSHIP,
    SET_USER_FILTER,
    GET_PROJECT_SERVICE_NAMES,
} from '../actions/projects';


export default function projects(state = fromJS({
  isProcessing: false,
  payload: [], // list of projects
  users: [], // list of users for the current project (NOT paginated result set)
  detailsInfo: {}, // information about current project (access level for the current user, etc.)
  userFilter: '', // local filter string (email, first or last name). filters the data from the `users` key
  hasErrors: false,
  errors: [],
  serviceNames: [],
}), action) {
  switch (action.type) {
    case CLEAN_PROJECTS_ERRORS:
      return state
              .set('hasErrors', false)
              .set('errors', List());

        // SET_USER_FILTER
    case SET_USER_FILTER:
      return state
                .set('userFilter', action.filter);

        // CLEAN_PROJECTS_USERS
    case CLEAN_PROJECTS_USERS:
      return state
                .set('users', List());

        // CREATE_PROJECT
    case CREATE_PROJECT.REQUEST:
      return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', List());

    case CREATE_PROJECT.SUCCESS:
      return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && List(action.response.data)) || List());

        // GET_PROJECTS
    case GET_PROJECTS.REQUEST:
      return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', List());

    case GET_PROJECTS.SUCCESS:
      return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && List(action.response.data)) || List())
                .set('payload', (action.response.res_code === 0 && List(action.response.data)) || List());

        // GET_PROJECT_DETAILS
    case GET_PROJECT_DETAILS.REQUEST:
      return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', List());

    case GET_PROJECT_DETAILS.SUCCESS:
      return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && List(action.response.data)) || List())
                .set('detailsInfo', (action.response.res_code === 0 && Map(action.response.data)) || Map());

        // GET_PROJECT_USERS
    case GET_PROJECT_USERS.REQUEST:
      return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', List());

    case GET_PROJECT_USERS.SUCCESS:
      return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && List(action.response.data)) || List())
                .set('users', (action.response.res_code === 0 && List(action.response.data)) || List());

        // PROJECT_ADD_USER
    case PROJECT_ADD_USER.REQUEST:
      return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', List());

    case PROJECT_ADD_USER.SUCCESS:
      return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && List(action.response.data)) || List());

        // PROJECT_UPDATE_MEMBERSHIP
    case PROJECT_UPDATE_MEMBERSHIP.REQUEST:
      return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', List());

    case PROJECT_UPDATE_MEMBERSHIP.SUCCESS:
      return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && List(action.response.data)) || List());

        // PROJECT_DELETE_MEMBERSHIP
    case PROJECT_DELETE_MEMBERSHIP.REQUEST:
      return state
                .set('isProcessing', true)
                .set('hasErrors', false)
                .set('errors', List());

    case PROJECT_DELETE_MEMBERSHIP.SUCCESS:
      return state
                .set('isProcessing', false)
                .set('hasErrors', action.response.res_code > 0)
                .set('errors', (action.response.res_code > 0 && List(action.response.data)) || List());


    // GET_PROJECT_SERVICE_NAMES
    case GET_PROJECT_SERVICE_NAMES.REQUEST:
      return state
                .set('isProcessing', true)
                .set('errors', List());

    case GET_PROJECT_SERVICE_NAMES.SUCCESS:
      return state
                .set('isProcessing', false)
                .set('serviceNames', (action.response.res_code === 0 && List(action.response.data)) || List())
                .set('errors', (action.response.res_code > 0 && List(action.response.data)) || List());


    default:
      return state;
  }
}

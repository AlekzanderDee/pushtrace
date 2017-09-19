import { createRequestTypes, action } from './index';

// CLEAN_PROJECTS_ERRORS
export const CLEAN_PROJECTS_ERRORS = 'CREATE_PROJECT';
export const cleanErrorsAC = () => action(CLEAN_PROJECTS_ERRORS);

// SET_USER_FILTER
export const SET_USER_FILTER = 'SET_USER_FILTER';
export const setUserFilterAC = (filter) => action(SET_USER_FILTER, filter);

// CLEAN_PROJECTS_USERS
export const CLEAN_PROJECTS_USERS = 'CLEAN_PROJECTS_USERS';
export const cleanProjectUsersAC = () => action(CLEAN_PROJECTS_USERS);

// CREATE_PROJECT
export const CREATE_PROJECT = createRequestTypes('CREATE_PROJECT');
export const createProjectAC = {
  request: (data) => action(CREATE_PROJECT.REQUEST, { data }),
  success: (response) => action(CREATE_PROJECT.SUCCESS, { response }),
  failure: (error) => action(CREATE_PROJECT.FAILURE, { error }),
};

// GET_PROJECTS
export const GET_PROJECTS = createRequestTypes('GET_PROJECTS');
export const getProjectsAC = {
  request: (data) => action(GET_PROJECTS.REQUEST, { data }),
  success: (response) => action(GET_PROJECTS.SUCCESS, { response }),
  failure: (error) => action(GET_PROJECTS.FAILURE, { error }),
};

// GET_PROJECT_DETAILS
export const GET_PROJECT_DETAILS = createRequestTypes('GET_PROJECT_DETAILS');
export const getProjectDetailsAC = {
  request: (data) => action(GET_PROJECT_DETAILS.REQUEST, { data }),
  success: (response) => action(GET_PROJECT_DETAILS.SUCCESS, { response }),
  failure: (error) => action(GET_PROJECT_DETAILS.FAILURE, { error }),
};

// GET_PROJECT_USERS
export const GET_PROJECT_USERS = createRequestTypes('GET_PROJECT_USERS');
export const getProjectUsersAC = {
  request: (data) => action(GET_PROJECT_USERS.REQUEST, { data }),
  success: (response) => action(GET_PROJECT_USERS.SUCCESS, { response }),
  failure: (error) => action(GET_PROJECT_USERS.FAILURE, { error }),
};

// PROJECT_ADD_USER
export const PROJECT_ADD_USER = createRequestTypes('PROJECT_ADD_USER');
export const projectAddUserAC = {
  request: (data) => action(PROJECT_ADD_USER.REQUEST, { data }),
  success: (response) => action(PROJECT_ADD_USER.SUCCESS, { response }),
  failure: (error) => action(PROJECT_ADD_USER.FAILURE, { error }),
};

// PROJECT_DELETE_MEMBERSHIP
export const PROJECT_DELETE_MEMBERSHIP = createRequestTypes('PROJECT_DELETE_MEMBERSHIP');
export const projectDeleteMembershipAC = {
  request: (data) => action(PROJECT_DELETE_MEMBERSHIP.REQUEST, { data }),
  success: (response) => action(PROJECT_DELETE_MEMBERSHIP.SUCCESS, { response }),
  failure: (error) => action(PROJECT_DELETE_MEMBERSHIP.FAILURE, { error }),
};


// PROJECT_UPDATE_MEMBERSHIP
export const PROJECT_UPDATE_MEMBERSHIP = createRequestTypes('PROJECT_UPDATE_MEMBERSHIP');
export const projectUpdateMembershipAC = {
  request: (data) => action(PROJECT_UPDATE_MEMBERSHIP.REQUEST, { data }),
  success: (response) => action(PROJECT_UPDATE_MEMBERSHIP.SUCCESS, { response }),
  failure: (error) => action(PROJECT_UPDATE_MEMBERSHIP.FAILURE, { error }),
};

// GET_PROJECT_SERVICE_NAMES
export const GET_PROJECT_SERVICE_NAMES = createRequestTypes('GET_PROJECT_SERVICE_NAMES');
export const getProjectServiceNamesAC = {
  request: (data) => action(GET_PROJECT_SERVICE_NAMES.REQUEST, { data }),
  success: (response) => action(GET_PROJECT_SERVICE_NAMES.SUCCESS, { response }),
  failure: (error) => action(GET_PROJECT_SERVICE_NAMES.FAILURE, { error }),
};

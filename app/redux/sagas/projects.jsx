import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, cancel } from 'redux-saga/effects';

import { BACKEND_API_URI, TOKEN } from '../../utils/settings';
import { ajaxPOST, ajaxPUT, ajaxGET, ajaxDELETE } from '../../utils/ajaxActions';
import * as actions from '../actions/projects';


// ============= CREATE_PROJECT =============
function* createProject(action) {
  try {
    const r = yield call(ajaxPOST, {
      url: `${BACKEND_API_URI}projects/`,
      data: action.data,
    });
    yield put(actions.createProjectAC.success(r.body));
  } catch (error) {
    yield put(actions.createProjectAC.failure(error));
  }
}
function* createProjectWatcher() {
  const watcher = yield takeEvery(actions.CREATE_PROJECT.REQUEST, createProject);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* createProjectSuccess(action) {
  if (action.response.res_code === 0) {
    yield put(actions.getProjectsAC.request());
  }
}
function* createProjectSuccessWatcher() {
  const watcher = yield takeEvery(actions.CREATE_PROJECT.SUCCESS, createProjectSuccess);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// ============= GET_PROJECTS =============
function* getProjects(action) {
  try {
    const r = yield call(ajaxGET, {
      url: `${BACKEND_API_URI}projects/`,
    });
    yield put(actions.getProjectsAC.success(r.body));
  } catch (error) {
    yield put(actions.getProjectsAC.failure(error));
  }
}
function* getProjectsWatcher() {
  const watcher = yield takeEvery(actions.GET_PROJECTS.REQUEST, getProjects);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// ============= GET_PROJECT_DETAILS =============
function* getProjectDetails(action) {
  try {
    const r = yield call(ajaxGET, {
      url: `${BACKEND_API_URI}projects/${action.data.projectId}/`,
    });
    yield put(actions.getProjectDetailsAC.success(r.body));
  } catch (error) {
    yield put(actions.getProjectDetailsAC.failure(error));
  }
}
function* getProjectDetailsWatcher() {
  const watcher = yield takeEvery(actions.GET_PROJECT_DETAILS.REQUEST, getProjectDetails);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// ============= GET_PROJECT_USERS =============
function* getProjectUsers(action) {
  let filter = '';
  if (action.data.filter) {
    filter = `?filter=${action.data.filter}`;
  }

  try {
    const r = yield call(ajaxGET, {
      url: `${BACKEND_API_URI}projects/${action.data.projectId}/users/${filter}`,
    });
    yield put(actions.getProjectUsersAC.success(r.body));
  } catch (error) {
    yield put(actions.getProjectUsersAC.failure(error));
  }
}
function* getProjectUsersWatcher() {
  const watcher = yield takeEvery(actions.GET_PROJECT_USERS.REQUEST, getProjectUsers);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// ============= PROJECT_ADD_USER =============
function* projectAddUser(action) {
  try {
    const r = yield call(ajaxPOST, {
      url: `${BACKEND_API_URI}projects/${action.data.projectId}/users/`,
      data: action.data.newUser,
    });
    yield put(actions.projectAddUserAC.success(r.body));
    if (r.body.res_code === 0) {
      yield put(actions.getProjectUsersAC.request({ projectId: action.data.projectId }));
    }
  } catch (error) {
    yield put(actions.projectAddUserAC.failure(error));
  }
}
function* projectAddUserWatcher() {
  const watcher = yield takeEvery(actions.PROJECT_ADD_USER.REQUEST, projectAddUser);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* projectAddUserSuccess(action) {
  if (action.response.res_code === 0) {
    yield put(actions.getProjectUsersAC.request({ projectId: action.data.projectId }));
  }
}
function* projectAddUserSuccessWatcher() {
    // const watcher = yield takeEvery(actions.PROJECT_ADD_USER.SUCCESS, projectAddUserSuccess);
    // // Suspend execution until location changes
    // yield take(LOCATION_CHANGE);
    // yield cancel(watcher);
}

// ============= PROJECT_DELETE_MEMBERSHIP =============
function* projectDeleteMembership(action) {
  try {
    const r = yield call(ajaxDELETE, {
      url: `${BACKEND_API_URI}projects/${action.data.projectId}/users/${action.data.membershipId}/`,
    });
    yield put(actions.projectDeleteMembershipAC.success(r.body));
        // After membership is deleted we need to grab updated list of users
    if (r.body.res_code === 0) {
      yield put(actions.getProjectUsersAC.request({ projectId: action.data.projectId }));
    }
  } catch (error) {
    yield put(actions.projectDeleteMembershipAC.failure(error));
  }
}
function* projectDeleteMembershipWatcher() {
  const watcher = yield takeEvery(actions.PROJECT_DELETE_MEMBERSHIP.REQUEST, projectDeleteMembership);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// ============= PROJECT_UPDATE_MEMBERSHIP =============
function* projectUpdateMembership(action) {
  try {
    const r = yield call(ajaxPUT, {
      url: `${BACKEND_API_URI}projects/${action.data.projectId}/users/${action.data.membershipId}/`,
      data: action.data.membershipData,
    });
    yield put(actions.projectUpdateMembershipAC.success(r.body));
        // After membership is updated we need to grab updated list of users
    if (r.body.res_code === 0) {
      yield put(actions.getProjectUsersAC.request({ projectId: action.data.projectId }));
    }
  } catch (error) {
    yield put(actions.projectUpdateMembershipAC.failure(error));
  }
}
function* projectUpdateMembershipWatcher() {
  const watcher = yield takeEvery(actions.PROJECT_UPDATE_MEMBERSHIP.REQUEST, projectUpdateMembership);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// ============= GET_PROJECT_SERVICE_NAMES =============
function* getProjectServiceNames(action) {
  try {
    const r = yield call(ajaxGET, {
      url: `${BACKEND_API_URI}projects/${action.data.projectId}/services/`,
    });
    yield put(actions.getProjectServiceNamesAC.success(r.body));
  } catch (error) {
    yield put(actions.getProjectServiceNamesAC.failure(error));
  }
}
function* getProjectServiceNamesWatcher() {
  const watcher = yield takeEvery(actions.GET_PROJECT_SERVICE_NAMES.REQUEST, getProjectServiceNames);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  createProjectWatcher,
  createProjectSuccessWatcher,
  getProjectsWatcher,
  getProjectDetailsWatcher,
  getProjectUsersWatcher,
  projectAddUserWatcher,
  projectAddUserSuccessWatcher,
  projectDeleteMembershipWatcher,
  projectUpdateMembershipWatcher,
  getProjectServiceNamesWatcher,
];

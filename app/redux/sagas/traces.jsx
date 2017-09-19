import moment from 'moment';
import _ from 'lodash';
import { call, put, take, cancel, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';

import { BACKEND_API_URI, TRACE_PAGE_SIZE } from '../../utils/settings';
import { ajaxGET } from '../../utils/ajaxActions';
import * as actions from '../actions/traces';


function* prepareQuery(isPaginating) {
  let query = {};

  // In case of pagination use existing saved query from the store, add only NextToken
  if (isPaginating === true) {
    const getNextToken = (state) => state.getIn(['traces', 'nextToken']);
    const nextToken = yield select(getNextToken);

    if (nextToken === '') {
      return query;
    }
    const getQueryParams = (state) => state.getIn(['traces', 'query']).toJS();
    const savedQuery = yield select(getQueryParams);
    // If paginating then use existing timestamps from the store
    query = savedQuery;
    query.pg = nextToken;
    return query;
  }

  // In case of new request create new Query
  const getFilters = (state) => state.getIn(['traces', 'filters']).toJS();
  const filters = yield select(getFilters);

  if (filters.timeRange.range !== -1) {
    // Setting start and finish timestamps to store
    query.st = moment().subtract(filters.timeRange.range, 'minutes').valueOf();
    query.fn = moment().valueOf();
  }

  // Set duration filter if enabled
  if (filters.duration.enabled === true) {
    query.ds = filters.duration.min;
    query.df = filters.duration.max;
  }

  // Set error filter if enabled (get only erred traces)
  if (filters.error.enabled === true) {
    query.er = true;
  }

  // Set service name filter with URL safe encoded value
  if (filters.serviceName.enabled === true) {
    query.sn = encodeURIComponent(filters.serviceName.serviceName);
  }
  // Save prepared query to the store
  yield put(actions.traceFilterAC.setQueryParams(query));

  return query;
}

function* getTraces(action) {
  console.log('getting traces', action.data.projectId, action.data.isPaginating);
  const query = yield* prepareQuery(action.data.isPaginating);
  //  Fetch data only if there is a query
  if (!_.isEmpty(query)) {
    try {
      const r = yield call(ajaxGET, {
        url: `${BACKEND_API_URI}projects/${action.data.projectId}/traces/`,
        query,
      });
      yield put(actions.getTracesAC.success(r.body));
    } catch (error) {
      yield put(actions.getTracesAC.failure(error));
    }
  }
}

function* getTracesWatcher() {
  const watcher = yield takeEvery(actions.GET_TRACES.REQUEST, getTraces);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


function* nextPage(action) {
  // In case we alomost read all the data from the store we want to try fetch additional data if possible
  const getTracesState = (state) => state.get('traces').toJS();
  const tracesState = yield select(getTracesState);

  const traceCount = tracesState.traces.length;
  const maxPageNumber = (traceCount + TRACE_PAGE_SIZE - 1) / TRACE_PAGE_SIZE;

  if (tracesState.nextToken !== '' && (maxPageNumber - tracesState.page) < 2) {
    const getCurProjectID = (state) => state.getIn(['projects', 'detailsInfo', 'id']);
    const curProjectID = yield select(getCurProjectID);
    console.log('proj id ', curProjectID);
    yield put(actions.getTracesAC.request({ projectId: curProjectID, isPaginating: true }));
  }
}

function* nextPageWatcher() {
  const watcher = yield takeEvery(actions.TRACE_FILTER.NEXT_PAGE, nextPage);
    // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


export default [
  getTracesWatcher,
  nextPageWatcher,
];

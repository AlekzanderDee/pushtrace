import { createRequestTypes, action } from './index';

// GET_TRACES
export const GET_TRACES = createRequestTypes('GET_TRACES');

export const getTracesAC = {
  request: (data) => action(GET_TRACES.REQUEST, { data }),
  success: (response) => action(GET_TRACES.SUCCESS, { response }),
  failure: (error) => action(GET_TRACES.FAILURE, { error }),
};


export const TRACE_FILTER = {

  SET_QUERY_PARAMS: 'SET_QUERY_PARAMS',

  NEXT_PAGE: 'NEXT_PAGE',
  PREV_PAGE: 'PREV_PAGE',

  TOGGLE_DURATION: 'TOGGLE_DURATION_FILTER',
  SET_DURATION: 'SET_DURATION_FILTER',

  TOGGLE_ERROR: 'TOGGLE_ERROR_FILTER',

  SET_TIMERANGE_TYPE: 'SET_TIMERANGE_TYPE',
  SET_TIMERANGE_VALUES: 'SET_TIMERANGE_VALUES',

  SET_SERVICE_NAME: 'SET_SERVICE_NAME',

};
export const traceFilterAC = {

  setQueryParams: (query) => action(TRACE_FILTER.SET_QUERY_PARAMS, { query }),
  nextPage: () => action(TRACE_FILTER.NEXT_PAGE),
  prevPage: () => action(TRACE_FILTER.PREV_PAGE),

  toggleDurationFilter: () => action(TRACE_FILTER.TOGGLE_DURATION),
  setDurationFilter: (min, max) => action(TRACE_FILTER.SET_DURATION, { min, max }),

  toggleErrorFilter: () => action(TRACE_FILTER.TOGGLE_ERROR),

  setServiceName: (serviceName) => action(TRACE_FILTER.SET_SERVICE_NAME, { serviceName }),

  setTimerangeFilterType: (timerangeType) => action(TRACE_FILTER.SET_TIMERANGE_TYPE, { timerangeType }),
  setTimerangeFilterValues: (start, finish) => action(TRACE_FILTER.SET_TIMERANGE_VALUES, { start, finish }),
};

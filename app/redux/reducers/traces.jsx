import { fromJS, List, Map } from 'immutable';

import { TRACE_PAGE_SIZE } from '../../utils/settings';

import {
    GET_TRACES,
    TRACE_FILTER,
} from '../actions/traces';


export default function traceReducer(state = fromJS({
  isProcessing: false,
  page: 1, // number of current page
  query: {}, // prepared query gor getting traces
  traces: [], // list of traces for the current project
  errors: [],
  nextToken: '',
  filters: {
    timeRange: {
      range: 10, // keeps time interval in minutes (10 min interval); -1 for custom interval
      start: 0.0,
      finish: 0.0,
    },
    duration: {
      enabled: false,
      min: 0,
      max: 40,
    },
    error: {
      enabled: false,
    },
    serviceName: {
      serviceName: 'All',
      enabled: false,
    },
  },
}), action) {
  switch (action.type) {
    case GET_TRACES.REQUEST: {
      let newState = state
        .set('isProcessing', true)
        .set('hasErrors', false)
        .set('errors', List());

      if (action.data.isPaginating !== true) {
        newState = newState
          .set('traces', List())
          .set('page', 1);
      }

      return newState;
    }

    case GET_TRACES.SUCCESS: {
      let newState = state
        .set('isProcessing', false)
        .set('hasErrors', action.response.res_code > 0);

      if (action.response.res_code === 0) {
        const newTraces = state.get('traces').toArray().slice();
        newTraces.push(...action.response.data.traces);

        newState = newState
          .set('traces', List(newTraces))
          .set('errors', List())
          .set('nextToken', action.response.data.next);
      } else {
        newState = newState
          .set('traces', List())
          .set('errors', action.response.data)
          .set('nextToken', '');
      }

      return newState;
    }

    case TRACE_FILTER.SET_DURATION: {
      return state
        .setIn(['filters', 'duration', 'min'], action.min)
        .setIn(['filters', 'duration', 'max'], action.max);
    }

    case TRACE_FILTER.TOGGLE_DURATION: {
      return state
        .setIn(['filters', 'duration', 'enabled'], !state.getIn(['filters', 'duration', 'enabled']));
    }

    case TRACE_FILTER.TOGGLE_ERROR: {
      return state
        .setIn(['filters', 'error', 'enabled'], !state.getIn(['filters', 'error', 'enabled']));
    }

    case TRACE_FILTER.SET_SERVICE_NAME: {
      let newState = state;
      if (action.serviceName === 'All') {
        newState = newState.setIn(['filters', 'serviceName', 'enabled'], false);
      } else {
        newState = newState.setIn(['filters', 'serviceName', 'enabled'], true);
      }
      return newState
        .setIn(['filters', 'serviceName', 'serviceName'], action.serviceName);
    }

    case TRACE_FILTER.SET_TIMERANGE_TYPE: {
      return state
        .setIn(['filters', 'timeRange', 'range'], action.timerangeType);
    }

    case TRACE_FILTER.SET_TIMERANGE_VALUES: {
      return state
        .setIn(['filters', 'timeRange', 'start'], action.start)
        .setIn(['filters', 'timeRange', 'finish'], action.finish);
    }

    case TRACE_FILTER.SET_QUERY_PARAMS: {
      return state
        .set('query', Map(action.query));
    }

    case TRACE_FILTER.NEXT_PAGE: {
      const traceCount = state.get('traces').toArray().length;
      const maxPageNumber = (traceCount + TRACE_PAGE_SIZE - 1) / TRACE_PAGE_SIZE;
      if (maxPageNumber > state.get('page')) {
        return state.set('page', state.get('page') + 1);
      }

      return state;
    }

    case TRACE_FILTER.PREV_PAGE: {
      if (state.get('page') > 1) {
        return state.set('page', state.get('page') - 1);
      }

      return state;
    }

    default:
      return state;
  }
}

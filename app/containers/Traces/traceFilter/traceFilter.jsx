import React from 'react';
import { connect } from 'react-redux';

import { TRACE_PAGE_SIZE } from '../../../utils/settings';
import SecondaryButton from '../../../components/Buttons/secondaryButton';
import * as traceActions from '../../../redux/actions/traces';
import { getProjectServiceNamesAC } from '../../../redux/actions/projects';

import DurationFilter from './DurationFilter/durationFilter';
import ErrorFilter from './ErrorFilter/errorFilter';
import ServiceNameFilter from './ServiceNameFilter/serviceNameFilter';
import TimeRangeFilter from './TimeRangeFilter/timeRangeFilter';


class TraceFilterPresentation extends React.Component {

  componentDidMount() {
    // don't get the list of traces if there is already one in the store
    // user can force getting the list of traces by clicking the `update` button

    // TODO: implement `update` button
    if (this.props.traces.length === 0 || (this.props.traces[0].project_id !== this.props.projectId)) {
      this.props.getTraces(this.props.projectId);
    }

    // Get service names list
    this.props.getProjectServiceNames(this.props.projectId);
  }


  render() {
    const nextBtnDisabled = Math.floor(((this.props.traces.length + TRACE_PAGE_SIZE - 1) / TRACE_PAGE_SIZE)) <= this.props.curTracePage;
    const prevBtnDisabled = this.props.curTracePage === 1;

    return (
      <div className="">
        <DurationFilter
          filter={this.props.filters.duration}
          defaultValue={[0, 10]}
          toggleDurationFilter={this.props.toggleDurationFilter}
          setDurationFilter={this.props.setDurationFilter}
        />
        <ErrorFilter
          filter={this.props.filters.error}
          toggleErrorFilter={this.props.toggleErrorFilter}
        />

        <ServiceNameFilter
          serviceNames={this.props.serviceNames}
          filter={this.props.filters.serviceName}
          setServiceNameFilter={this.props.setServiceNameFilter}
        />

        <TimeRangeFilter
          filter={this.props.filters.timeRange}
          timerangeTypeSwitcher={this.props.setTimerangeType}
        />

        <SecondaryButton onClick={(e) => { e.preventDefault(); this.props.getTraces(this.props.projectId, false); }}>
          Search
        </SecondaryButton>

        <SecondaryButton disabled={prevBtnDisabled} onClick={(e) => { e.preventDefault(); this.props.prevPage(); }}>
          Prev
        </SecondaryButton>
        <SecondaryButton disabled={nextBtnDisabled} onClick={(e) => { e.preventDefault(); this.props.nextPage(); }}>
          Next
        </SecondaryButton>
      </div>
    );
  }
}


TraceFilterPresentation.propTypes = {
  traces: React.PropTypes.array.isRequired,
  projectId: React.PropTypes.string.isRequired,
  filters: React.PropTypes.object.isRequired,
  serviceNames: React.PropTypes.array.isRequired,
  curTracePage: React.PropTypes.number.isRequired,

  toggleDurationFilter: React.PropTypes.func.isRequired,
  setDurationFilter: React.PropTypes.func.isRequired,
  toggleErrorFilter: React.PropTypes.func.isRequired,
  getTraces: React.PropTypes.func.isRequired,
  nextPage: React.PropTypes.func.isRequired,
  prevPage: React.PropTypes.func.isRequired,

  setTimerangeType: React.PropTypes.func.isRequired,

  getProjectServiceNames: React.PropTypes.func.isRequired,
  setServiceNameFilter: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const traces = state.get('traces').toJS();
  const serviceNames = ['All'].concat(state.getIn(['projects', 'serviceNames']).toJS());
  return {
    // isProcessing: traces.isProcessing,
    traces: traces.traces,
    filters: traces.filters,
    curTracePage: traces.page,
    serviceNames,

  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleDurationFilter: () => dispatch(traceActions.traceFilterAC.toggleDurationFilter()),
  setDurationFilter: (min, max) => dispatch(traceActions.traceFilterAC.setDurationFilter(min, max)),
  toggleErrorFilter: () => dispatch(traceActions.traceFilterAC.toggleErrorFilter()),
  getTraces: (projectId, isPaginating) => dispatch(traceActions.getTracesAC.request({ projectId, isPaginating })),
  nextPage: () => dispatch(traceActions.traceFilterAC.nextPage()),
  prevPage: () => dispatch(traceActions.traceFilterAC.prevPage()),

  setTimerangeType: (timerangeType) => dispatch(traceActions.traceFilterAC.setTimerangeFilterType(timerangeType)),

  getProjectServiceNames: (projectId) => dispatch(getProjectServiceNamesAC.request({ projectId })),
  setServiceNameFilter: (serviceName) => dispatch(traceActions.traceFilterAC.setServiceName(serviceName)),
});

const TraceFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(TraceFilterPresentation);

export default TraceFilter;

import React from 'react';
import { connect } from 'react-redux';

import { TRACE_PAGE_SIZE } from '../../../utils/settings';

import Trace from '../../../components/Trace/Trace';


const TraceListPresentation = (props) => (
  <div className="full-width">
    <h3>Trace count {props.traces.length}</h3>
    {
        props.traces.map((trace, ind) => <Trace
          key={ind}
          id={trace.trace_id}
          errorCount={trace.error_count}
          tagCount={trace.tag_count}
          logCount={trace.log_count}
          serviceName={trace.service_name}
          startTime={trace.start_time}
          spanCount={trace.span_count}
          duration={trace.duration}
          isPinned={false}
        />)
      }
  </div>
);


TraceListPresentation.propTypes = {
  traces: React.PropTypes.array.isRequired,
  isProcessing: React.PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const traces = state.get('traces').toJS();
  const firstPageNumber = TRACE_PAGE_SIZE * (traces.page - 1);
  const lastPageNumber = firstPageNumber + TRACE_PAGE_SIZE;
  const traceArray = traces.traces.slice(firstPageNumber, lastPageNumber);
  return {
    isProcessing: traces.isProcessing,
    traces: traceArray,
  };
};


const TraceList = connect(
  mapStateToProps,
  null
)(TraceListPresentation);

export default TraceList;

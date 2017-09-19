import React from 'react';

import TraceList from './traceList/traceList';
import TraceFilter from './traceFilter/traceFilter';


const Traces = (props) => (
  <div className="row full-width">
    <div className="col-md-3 last-md ">
      <TraceFilter projectId={props.params.projectId} />
    </div>
    <div className="col-md-9 full-width">
      <TraceList />
    </div>
  </div>
);

Traces.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default Traces;

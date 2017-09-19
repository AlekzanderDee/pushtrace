import React from 'react';

import ExceptionIcon from "./ExceptionIcon/ExceptionIcon"
import TagsIcon from "./TagsIcon/TagsIcon"
import EventsIcon from "./EventsIcon/EventsIcon"
import StartLabel from "./StartLabel/StartLabel"
import SpanCount from "./SpanCount/SpanCount"
import Duration from "./Duration/Duration"
import PinnedIcon from "./PinnedIcon/PinnedIcon"
import ExpandButtton from "./ExpandButton/ExpandButton"

export default class Trace extends React.Component {
  render () {
    return (
      <div className="trace row middle-xs">
        <div className="col-sm-2 center-xs">
          <div className="row">
            <div className="col-sm-3 center-xs"><ExceptionIcon errorCount={this.props.errorCount}/></div>
            <div className="col-sm-3 center-xs"><TagsIcon tagCount={this.props.tagCount}/></div>
            <div className="col-sm-3 center-xs"><EventsIcon logCount={this.props.logCount}/></div>
            <div className="col-sm-3 center-xs"><PinnedIcon active={this.props.isPinned}/></div>
          </div>
        </div>
        <div className="col-sm-2 center-xs trace__service-name">{this.props.serviceName}</div>
        <div className="col-sm-4 center-xs"><StartLabel startTime={this.props.startTime}/></div>
        <div className="col-sm-1 center-xs"><SpanCount spanCount={this.props.spanCount}/></div>
        <div className="col-sm-2 center-xs"><Duration duration={this.props.duration}/></div>
        <div className="col-sm-1 center-xs"><ExpandButtton/></div>
      </div>
    )
  }
}

Trace.PropTypes = {
  id: React.PropTypes.string.isRequired,
  errorCount: React.PropTypes.bool.isRequired,
  tagCount: React.PropTypes.bool.isRequired,
  logCount: React.PropTypes.bool.isRequired,
  serviceName: React.PropTypes.string.isRequired,
  startTime: React.PropTypes.number.isRequired,
  spanCount: React.PropTypes.number.isRequired,
  duration: React.PropTypes.number.isRequired,
  isPinned: React.PropTypes.bool.isRequired,
}

import React from 'react';

export default class EventsIcon extends React.Component {
  render () {

    return (
      <span className={"fa fa-flag trace__events"+(this.props.logCount > 0 && " --active" || "")}/>
    )
  }
}

EventsIcon.PropTypes = {
  logCount: React.PropTypes.bool.isRequired,
}

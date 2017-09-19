import React from 'react';
import moment from "moment";

export default class StartLabel extends React.Component {
  render () {

    return (
      <span className={"trace__start-label"}>
        {moment.unix(this.props.startTime / 1000).format("MM/DD/YY HH:mm:ss Z")}
      </span>
    )
  }
}

StartLabel.PropTypes = {
  startTime: React.PropTypes.number.isRequired,
}

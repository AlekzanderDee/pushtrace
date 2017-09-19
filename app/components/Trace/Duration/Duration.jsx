import React from 'react';

export default class Duration extends React.Component {
  render () {

    return (
      <span className={"trace__duration"}>
        {this.props.duration + " μs"}
      </span>
    )
  }
}

Duration.PropTypes = {
  duration: React.PropTypes.number.isRequired,
}

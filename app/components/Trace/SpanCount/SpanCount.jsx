import React from 'react';

export default class SpanCount extends React.Component {
  render () {

    return (
      <span className={"trace__span-count"}>
        <span className="trace__span-count__label">S:</span>
        <span className="trace__span-count__count">{this.props.spanCount}</span>
      </span>
    )
  }
}

SpanCount.PropTypes = {
  spanCount: React.PropTypes.number.isRequired,
}

import React from 'react';


export default class Panel extends React.Component {
  render () {

    return (
      <div className="panel">
        <div className="panel__header">{this.props.header}</div>
        <div className="panel__body">{this.props.children}</div>
      </div>
    )
  }
}

Panel.PropTypes = {
  header: React.PropTypes.string.isRequired,
}

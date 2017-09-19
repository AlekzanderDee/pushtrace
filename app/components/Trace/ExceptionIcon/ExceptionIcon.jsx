import React from 'react';

export default class ExceptionIcon extends React.Component {
  render () {

    return (
      <span className={"fa fa-fire trace__exception"+(this.props.errorCount > 0 && " --active" || "")}/>
    )
  }
}

ExceptionIcon.PropTypes = {
  errorCount: React.PropTypes.bool.isRequired,
}

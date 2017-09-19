import React from 'react';

export default class PinnedIcon extends React.Component {
  render () {

    return (
      <span className={"fa fa-thumb-tack trace__pinned"+(this.props.active == true && " --active" || "")}/>
    )
  }
}

PinnedIcon.PropTypes = {
  active: React.PropTypes.bool.isRequired,
}

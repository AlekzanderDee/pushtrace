import React from 'react';

export default class TagsIcon extends React.Component {
  render () {

    return (
      <span className={"fa fa-tags trace__tags"+(this.props.tagCount > 0 && " --active" || "")}/>
    )
  }
}

TagsIcon.PropTypes = {
  tagCount: React.PropTypes.bool.isRequired,
}

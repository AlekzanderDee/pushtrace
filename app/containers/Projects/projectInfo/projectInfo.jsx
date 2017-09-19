import React from 'react';
import {connect} from 'react-redux';

import CopyToClipboard from 'react-copy-to-clipboard';

import Panel from '../../../components/Panel/Panel'
import protectedComponent from '../../../components/protectedComponent'


@protectedComponent()
class ProjectInfoPresentation extends React.Component {

  render() {
    const projectIDHeader = (
      <div className="fl fl-sb" >
        <span className="">Project ID</span>
        <CopyToClipboard text={this.props.projectID}
             onCopy={() => this.setState({copied: true})}>
            <span className="project-info__copy-btn fa fa-files-o"/>
        </CopyToClipboard>
      </div>
    )

    return (
      <section className="project-info padding-lg">
        <div className="row">

          <div className="col-xs-12 col-sm-6 col-md-2">
            <Panel header="Project Title">
              <span>{this.props.projectTitle}</span>
            </Panel>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3">
            <Panel header={projectIDHeader}>
              {this.props.projectID}
            </Panel>
          </div>

        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // Project title and project id are fetch from the backend in the ProjectContainer
  // so we assume we have them in the store.
  const detailsInfo = state.get('projects').get('detailsInfo')
  return {
    projectTitle: detailsInfo.title || "Unknown",
    projectID: detailsInfo.id || "Unknown",
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}


const ProjectInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectInfoPresentation);

export default ProjectInfo

import React from 'react';
import { connect } from 'react-redux';

import protectedComponent from '../../../components/protectedComponent';
import AddProjectButton from './addProjectBtn/addProjectBtn';
import ProjectCard from './projectCard/projectCard';
import TokenManager from '../../../utils/authTokenManager';

import * as actions from '../../../redux/actions/projects';


@protectedComponent()
class ProjectListPresentation extends React.Component {

  componentWillMount() {
    this.props.getProjects();
  }

  render() {
    return (
      <section className="project-list">
        {this.props.isAccountHolder && <AddProjectButton />}
        {this.props.projects.length > 0 && this.props.projects.map((project, ind) => <ProjectCard key={ind} id={project.project_id} title={project.title} />)}
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const tokenPayload = TokenManager.getTokenPayload();
  let isAccountHolder = false;
  if (tokenPayload) {
    isAccountHolder = !!tokenPayload.is_account_holder;
  }
  return {
    projects: state.get('projects').get('payload').toArray(),
    isAccountHolder,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProjects: () => {
    dispatch(actions.getProjectsAC.request());
  },
});


const ProjectList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectListPresentation);

export default ProjectList;

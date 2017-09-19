import React from 'react';
import {connect} from 'react-redux';

import protectedComponent from '../../../components/protectedComponent'
import * as actions from '../../../redux/actions/projects'

import Header from './header/header'
import Body from './body/body'


@protectedComponent()
class ProjectUsersPresentation extends React.Component {

    componentDidMount() {
        this.props.getProjectUsers(this.props.params.projectId)
    }

    render() {

        return (
            <section className="project-users">
                <Header/>
                <Body projectId={this.props.params.projectId}/>
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectUsers: (projectId) => {
            dispatch(actions.getProjectUsersAC.request({projectId: projectId}))
        },
    }
}


const ProjectUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectUsersPresentation);

export default ProjectUsers

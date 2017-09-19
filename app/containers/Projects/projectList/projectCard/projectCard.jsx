import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import urlMap from '../../../../utils/urlManager'


class ProjectCardPresentation extends React.Component {

    render() {
        const tracesURL = urlMap.projectTraces
        const usersURL = urlMap.projectUsers
        return (
            <Link to={tracesURL.replace(':projectId',this.props.id)}>
                <div className="project-list__card --project " >
                    <span className="title">{this.props.title}</span>
                    <hr/>
                    <div className="links">
                        <i className="fa fa-align-left fa-lg"/>
                        <i className="fa fa-bar-chart fa-lg"/>
                        <i className="fa fa-sitemap fa-lg"/>
                        <i className="fa fa-user fa-lg" onClick={e => {
                            e.preventDefault();
                            browserHistory.push(usersURL.replace(':projectId',this.props.id))
                        }}/>
                    </div>

                </div>
            </Link>
        );
    }
}

ProjectCardPresentation.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


const ProjectCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectCardPresentation);

export default ProjectCard

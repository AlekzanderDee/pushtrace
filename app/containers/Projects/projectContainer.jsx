import { toJS } from 'immutable';
import React from 'react'
import { connect } from 'react-redux'

import ProjectMenuContent from './projectMenu/projectMenu'
import protectedComponent from '../../components/protectedComponent'

import { setMenuContent, removeMenuContent, openSideMenu, closeSideMenu, togglePinnedMode } from '../../redux/actions/sideMenu'
import { getProjectDetailsAC } from '../../redux/actions/projects'


@protectedComponent()
class ProjectContainerPresentation extends React.Component {

    componentDidMount () {
        this.props.getProjectDetails(this.props.params.projectId)
        this.props.setMenuContent(this.props.projectTitle, <ProjectMenuContent projectId={this.props.params.projectId}
                                                                               location={this.props.location}/>)
        this.props.togglePinnedMode()
        this.props.openSideMenu()
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.projectTitle != nextProps.projectTitle) {
        this.props.setMenuContent(nextProps.projectTitle, <ProjectMenuContent projectId={this.props.params.projectId}
                                                                              location={this.props.location}/>)
      }
    }

    componentWillUnmount () {
        this.props.closeSideMenu()
        this.props.removeMenuContent()
    }

    render() {

        return (
            <section className="project-container">
                {/*{!!this.props.isProcessing && <div><Spinner size="sm"/></div>}*/}
                {/*{!this.props.isProcessing && !!this.props.projectErrors && this.props.children}*/}
                {/*{!this.props.isProcessing && !this.props.projectErrors && <h2>Error</h2>}*/}
                {this.props.children}
            </section>
        )
    }

}


const mapStateToProps = (state) => {
    const projectsState = state.get('projects').toJS()
    return {
        isProcessing: projectsState.isProcessing,
        projectDetails: projectsState.detailsInfo,
        projectErrors: projectsState.errors,
        projectTitle: projectsState.detailsInfo.title || ""
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMenuContent: (title, items) => {dispatch(setMenuContent(title, items))},
        openSideMenu: () => {dispatch(openSideMenu())},
        closeSideMenu: () => {dispatch(closeSideMenu())},
        removeMenuContent: () => {dispatch(removeMenuContent())},
        togglePinnedMode: () => {dispatch(togglePinnedMode())},
        getProjectDetails: (projectId) => {dispatch(getProjectDetailsAC.request({projectId}))}
    }
}

const ProjectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectContainerPresentation);


export default ProjectContainer;

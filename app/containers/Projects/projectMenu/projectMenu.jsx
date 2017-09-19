import React from 'react'
import { browserHistory } from 'react-router'

import MenuElement from '../../../components/burgerMenuItem'
import urlMap from '../../../utils/urlManager'


class ProjectMenuContent extends React.Component {
    state = {
        path: window.location.pathname,
    }

    updateLocation = (e) => {
        e.preventDefault()
        this.setState({path: window.location.pathname})
    }

    onTracesClick = (e) => {
        e.preventDefault();
        const path = urlMap.projectTraces
        browserHistory.push(path.replace(':projectId',this.props.projectId))
    }

    onMembersSettingsClick = (e) => {
        e.preventDefault();
        const path = urlMap.projectUsers
        browserHistory.push(path.replace(':projectId', this.props.projectId))
    }

    tracesActiveCheck = () => {
        const path = urlMap.projectTraces.replace(':projectId',this.props.projectId)
        return path == this.state.path
    }

    membersActiveCheck = () => {
        const path = urlMap.projectUsers.replace(':projectId',this.props.projectId)
        return path == this.state.path
    }

    onProjectInfoClick = (e) => {
        e.preventDefault();
        const path = urlMap.projectInfo
        browserHistory.push(path.replace(':projectId', this.props.projectId))
    }

    projectInfoActiveCheck = () => {
        const path = urlMap.projectInfo.replace(':projectId',this.props.projectId)
        return path == this.state.path
    }


    render() {
        return (
            <div className="margin-lg-top" onClick={this.updateLocation}>
                <MenuElement key="1" onItemClick={this.onTracesClick} isActive={this.tracesActiveCheck()}>
                    <span><li className="bm-item-icon fa fa-fw fa-align-left"></li>Traces</span>
                </MenuElement>

                <MenuElement key="2">
                    <span><li className="bm-item-icon fa fa-fw fa-line-chart"></li>Statistics</span>
                </MenuElement>

                <MenuElement key="3">
                    <span><li className="bm-item-icon fa fa-fw fa-sitemap"></li>Map</span>
                </MenuElement>

                <MenuElement key="4" isActive={this.membersActiveCheck() || this.projectInfoActiveCheck()}>
                    <span><li className="bm-item-icon fa fa-fw fa-cogs"></li>Settings</span>

                    <MenuElement key="4.1" onItemClick={this.onMembersSettingsClick} isActive={this.membersActiveCheck()}>
                        <span>Users</span>
                    </MenuElement>

                    <MenuElement key="4.2" info={true} onItemClick={this.onProjectInfoClick} isActive={this.projectInfoActiveCheck()}>
                        <span>General info</span>
                    </MenuElement>
                </MenuElement>

            </div>
        )
    }
}

ProjectMenuContent.contextTypes = {
  router: React.PropTypes.object,
};

export default ProjectMenuContent;

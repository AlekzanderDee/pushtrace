import { toJS } from 'immutable';

import React from 'react';
import {connect} from 'react-redux';

import Spinner from '../../../../components/spinner'
import { setUserFilterAC } from '../../../../redux/actions/projects'


class ProjectUsersHeaderPresentation extends React.Component {

    onFilterChange = e => {
        e.preventDefault()
        this.props.setUserFilter(e.target.value)
    }

    resetFilter = e => {
        e.preventDefault()
        this.props.setUserFilter("")
    }

    componentWillUnmount () {
        this.props.setUserFilter("")
    }

    render() {

        let inputClasses = "project-users__filter__input"
        if (!this.props.userFilter) {
            inputClasses += ' --empty'
        }

        return (
            <div className="project-users__header">
                <div className="project-users__filter">
                    <input type="text" className={inputClasses} placeholder="filter..."
                           value={this.props.userFilter} onChange={this.onFilterChange}/>
                    {!!this.props.userFilter &&
                        <span className="project-users__filter__input__close fa fa-close" onClick={this.resetFilter}/>}
                </div>

                {this.props.isProcessing && <Spinner size="sm"/>}
            </div>
        )
    }
}

ProjectUsersHeaderPresentation.propTypes = {
    isProcessing: React.PropTypes.bool.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    const projectsState = state.get('projects').toJS()
    return {
        isProcessing: projectsState.isProcessing,
        userFilter: projectsState.userFilter,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserFilter: (filter) => {
            dispatch(setUserFilterAC({filter: filter}))
        },

    }
}


const ProjectUsersHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectUsersHeaderPresentation);

export default ProjectUsersHeader

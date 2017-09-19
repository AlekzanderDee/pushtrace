import { toJS } from 'immutable';
import React from 'react';
import { connect } from 'react-redux';
import Flipper from '../../../../components/flipper'
import Spinner from '../../../../components/spinner'

import * as actions from '../../../../redux/actions/projects'



class AddProjectPresentation extends React.Component {
    state = {
        flipped: false
    }

    flip = (e) => {
        if (!this.state.flipped) {
            this.refs.newProjectTitle.focus()
        }
        this.refs.newProjectTitle.value = ""
        this.setState({
            flipped: !this.state.flipped,
        });
    }

    addProjectClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.props.createProject({'project_title': this.refs.newProjectTitle.value})
        this.flip()
    }

    cleanErrorsClick = (e) => {
        e.preventDefault()
        this.props.cleanErrors()
    }

    render() {

        let frontContent;
        if (this.props.isProcessing) {
            frontContent = (
                <div className="project-list__card add-project-cont__add-btn --front">
                        <Spinner/>
                </div>
            )
        } else if (this.props.errors.length > 0) {
            frontContent = (
                <div className="project-list__card add-project-cont__add-btn --front --error">
                    <small className="margin-md-bottom">Error(s):</small>
                    {this.props.errors.map((error, ind) => {
                            return <small key={ind} className="add-project-cont__add-btn__error">{error}</small>
                    })}
                    <hr className="margin-md"/>
                    <i className="fa fa-close fa-lg" onClick={this.cleanErrorsClick}></i>
                </div>
            )
        } else {
            frontContent = (
                <div className="project-list__card add-project-cont__add-btn --front" onClick={this.flip}>
                        <i className="fa fa-plus fa-lg"></i>
                        <hr/>
                        <span className="add-project-cont__add-btn__label">Create project</span>
                </div>
            )
        }

        return (
            <div className="add-project-cont">
                <Flipper orientation="horizontal" flipped={this.state.flipped}>
                {/*<Flipper orientation="horizontal" flipped={true}>*/}
                    {frontContent}
                    <div className="project-list__card add-project-cont__add-btn --back">
                        <form className="add-project-cont__add-btn__form" action="" onSubmit={this.addProjectClick}>
                            <input id="project-title" className="form-control" name="project_title"
                                   type="text" defaultValue={''} placeholder="project title" required="true"
                                   onClick={(e) => {
                                      e.stopPropagation()
                                   }}
                                   ref="newProjectTitle"
                            />
                        </form>
                        <hr/>
                        <div className="add-project-cont__add-btn__controls">
                            <button className="btn primary-btn" type="submit"
                                    onClick={this.addProjectClick}>
                                Create
                            </button>

                            <button className="btn secondary-btn" onClick={this.flip}>
                                Cancel
                            </button>
                        </div>

                    </div>
                </Flipper>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const pojectsState = state.get('projects').toJS()
    return {
        errors: pojectsState.errors,
        isProcessing: pojectsState.isProcessing,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cleanErrors: () => dispatch(actions.cleanErrorsAC()),
        createProject: (data) => {
            dispatch(actions.createProjectAC.request(data))
        },

    }
}


const AddProject = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddProjectPresentation);

export default AddProject

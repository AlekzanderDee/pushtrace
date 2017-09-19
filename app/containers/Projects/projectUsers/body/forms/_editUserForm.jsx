import React from 'react';
import {connect} from 'react-redux';

import Select from '../../../../../components/underlinedSelect'

import {projectUpdateMembershipAC, projectDeleteMembershipAC} from '../../../../../redux/actions/projects'
import * as modalActions from '../../../../../redux/actions/modal'
import { MEMBERSHIP_ROLES } from '../../../../../utils/settings'


class EditUserFormPresentation extends React.Component {

    state = {
        role: this.props.role,
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            role: nextProps.role,
        })
    }


    _getChangeHandler = (inputName) => {
        return (e) => {
            e.preventDefault()
            let newState = {}
            newState[inputName] = e.target.value
            this.setState(newState)
        }
    }

    updateMembership = e => {
        e.preventDefault()
        this.props.updateMembership(this.props.projectId, this.props.membershipId, {role: this.state.role})
    }

    deleteMembership = e => {
        e.preventDefault()
        const deleteHandler = e => {
            e.preventDefault()
            this.props.deleteMembership(this.props.projectId, this.props.membershipId)
            this.props.closeModal()
        }
        const cancelHandler = e => {
            e.preventDefault();
            this.props.closeModal()
        }

        const modalContent = (
            <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">Close membership</h3>
                </div>
                <div className="panel-body">
                     <div className="text-center text-danger">
                        <span className="fa fa-warning"/> This action cannot be undone!
                    </div>
                    <div className="text-center ">
                        Do you want to close membership for the user with email address {this.props.email}?
                    </div>

                </div>
                <div className="panel-footer">
                     <button className="btn primary-btn" onClick={cancelHandler}>Cancel</button>

                <button className="btn secondary-btn pull-right" onClick={deleteHandler}>Delete</button>
                </div>
            </div>
        )

        this.props.setModalContent(modalContent)
        this.props.openModal()
    }

    render() {
        return (
            <div className="project-users__body__details__edit-user padding-lg-hor">
                <h4 className="project-users__body__details__edit-user__email margin-md-bottom">{this.props.email}</h4>

                <form className="project-users__body__details__user-form "
                      onSubmit={this.updateMembership} >

                    <Select name="role" options={[MEMBERSHIP_ROLES.analyst, MEMBERSHIP_ROLES.readOnly, MEMBERSHIP_ROLES.owner]}
                            labelText="role" value={this.state.role} onChange={this._getChangeHandler("role")}
                            extraGrpClasses="--white padding-sm-bottom"/>

                    <div className="project-users__body__details__user-form__errors">
                        {this.props.errors.map((error, ind) => <span key={ind} className="error">{error}</span>)}
                    </div>

                    <button type="submit" className="btn primary-btn">Save</button>

                </form>

                <button className="project-users__body__details__edit-user__delete-btn btn secondary-btn margin-md-vert"
                        onClick={this.deleteMembership}>Delete</button>

            </div>
        )
    }
}


EditUserFormPresentation.PropTypes = {
    projectId: React.PropTypes.string.isRequired,
    membershipId: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    role: React.PropTypes.string.isRequired,
    errors: React.PropTypes.array,
}



const mapStateToProps = (state, ownProps) => {
    return {
        projectId: ownProps.projectId,
        email: ownProps.email,
        membershipId: ownProps.membershipId,
        role: ownProps.role,
        errors: state.get('projects').get('errors'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        updateMembership: (projectId, membershipId, membershipData) => {
            dispatch(projectUpdateMembershipAC.request({
                projectId: projectId,
                membershipId: membershipId,
                membershipData: membershipData}))
        },

        deleteMembership: (projectId, membershipId) => {
            dispatch(projectDeleteMembershipAC.request({
                projectId: projectId,
                membershipId: membershipId
            }))
        },

        setModalContent: (content) => {
            dispatch(modalActions.setModalContentAC(content))
        },

        openModal: () => {
            dispatch(modalActions.openModalAC())
        },

        closeModal: () => {
            dispatch(modalActions.closeModalAC())
        },

    }
}

const EditUserForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUserFormPresentation);



export default EditUserForm


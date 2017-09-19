import React from 'react';
import {connect} from 'react-redux';

import {projectAddUserAC} from '../../../../../redux/actions/projects'

import Input from '../../../../../components/underlinedInput'
import Select from '../../../../../components/underlinedSelect'

import { MEMBERSHIP_ROLES } from '../../../../../utils/settings'


class AddUserFormPresentation extends React.Component {

    state = {
        email: "",
        firstName: "",
        lastName: "",
        role: MEMBERSHIP_ROLES.analyst
    }

    handleChange = (event) => {
        let newState = this.state || {}
        newState[event.target.name] = event.target.value
        this.setState(newState);
    }

    inviteUser = (e) => {
        e.preventDefault()
        this.props.inviteUser(
            this.props.projectId,
            {
                email:this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                role: this.state.role
            }
        )
        // cleaning local state
        this.setState({
            email: "",
            firstName: "",
            lastName: "",
            role: MEMBERSHIP_ROLES.analyst
        })

    }

    render() {

        return (
            <form className="project-users__body__details__user-form padding-lg"
                  onSubmit={this.inviteUser} >

                <Input name="email" type="email" labelText="email" onChange={this.handleChange}
                       extraGrpClasses="--white padding-sm-bottom" value={this.state.email}/>

                <Input name="firstName" type="text" labelText="first name" onChange={this.handleChange}
                       extraGrpClasses="--white padding-sm-bottom" value={this.state.firstName}/>

                <Input name="lastName" type="text" labelText="last name" onChange={this.handleChange}
                       extraGrpClasses="--white padding-sm-bottom" value={this.state.lastName}/>

                <Select name="role" options={[MEMBERSHIP_ROLES.analyst, MEMBERSHIP_ROLES.readOnly]} labelText="role" value={this.state.role}
                        onChange={this.handleChange} extraGrpClasses="--white padding-sm-bottom"/>

                <div className="project-users__body__details__user-form__errors">
                    {this.props.errors.map((error, ind) => <span key={ind} className="error">{error}</span>)}
                </div>

                <button className="btn primary-btn">Invite</button>

            </form>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.get('projects').get('errors'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        inviteUser: (projectId, newUser) => {
            dispatch(projectAddUserAC.request({projectId: projectId, newUser: newUser}))
        },

    }
}


const AddUserForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUserFormPresentation);

export default AddUserForm

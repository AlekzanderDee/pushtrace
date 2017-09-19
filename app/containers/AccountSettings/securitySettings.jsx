import { toJS } from 'immutable';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Spinner from '../../components/spinner'
import DeleteAccountModal from './deleteAccountModal'

import { changePasswordAC } from '../../redux/actions/auth'
import { openModalAC, setModalContentAC } from '../../redux/actions/modal'


class SecuritySettingsPresentation extends React.Component {

    onFormSubmit = e => {
        e.preventDefault()
        if (this.refs.old_password.value && this.refs.new_password1.value && this.refs.new_password2.value) {
            this.props.changePassword({
                old_password: this.refs.old_password.value,
                new_password1: this.refs.new_password1.value,
                new_password2: this.refs.new_password2.value,
            })
        }

        this.refs.old_password.value = ''
        this.refs.new_password1.value = ''
        this.refs.new_password2.value = ''
    }

    deleteAccountClick = e => {
        e.preventDefault()

        this.props.setModalContent(<DeleteAccountModal/>)
        this.props.openModal()
    }

    render () {
        let submitButton;
        if (this.props.isProcessing) {
            submitButton = (
                <button className="btn btn-default submit primary-btn" disabled="disabled">
                    Change password <Spinner/>
                </button>
            )
        } else {
            submitButton = (
                <button type="submit" className="btn submit primary-btn">
                    Change password
                </button>
            )
        }
        return (
            <div id="account-settings-content">
                <form id="change-password" onSubmit={this.onFormSubmit}>
                    <h4>Change password</h4>

                    <div className="form-group">
                        <input ref="old_password" type="password"/>
                        <hr/>
                        <label htmlFor="">Current Password</label>
                    </div>

                    <div className="form-group">
                        <input ref="new_password1" type="password"/>
                        <hr/>
                        <label htmlFor="">New Password</label>
                    </div>

                    <div className="form-group">
                        <input ref="new_password2" type="password"/>
                        <hr/>
                        <label htmlFor="">Confirm New Password</label>
                    </div>

                    {submitButton}

                    {this.props.hasErrors &&  <p className=" margin-md-top input-error-msg">{this.props.errors.error}</p>}

                </form>


                <button className="btn secondary-btn margin-lg-top" onClick={this.deleteAccountClick}>
                    Delete account
                </button>

            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
  const authState = state.get('auth').toJS()
    return {
        isProcessing: authState.isProcessing,
        hasErrors: authState.hasErrors,
        errors: authState.errors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (data) => dispatch(changePasswordAC.request(data)),
        openModal: () => dispatch(openModalAC()),
        setModalContent: (content) => dispatch(setModalContentAC(content)),
    }
}


const SecuritySettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(SecuritySettingsPresentation);

export default SecuritySettings

import { toJS } from 'immutable';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { sendPasswordResetAC, cleanAuthErrorsAC } from '../redux/actions/auth'

import NavLink from '../components/navLink'
import Spinner from '../components/spinner'

class RequestPasswordResetPresentation extends React.Component {

    componentWillMount() {
        this.props.cleanErrors()
    }

    onSubmitRequest = (e) => {
        e.preventDefault()
        this.props.requestResetPassword({email: this.refs.email.value})
    }

    renderErrors = (errors) => {
        if (!_.isUndefined(errors)) {
            return errors.map((error, index)=> {
                return <p key={index} className="input-error-msg">{error}</p>
            })
        }
    }

    renderInput = (refName, type, name, placeholder) => {
        let errorClass = ''
        if (this.props.errors[name]){
            errorClass = ' error'
        }
        return (
            <div className={"form-input" + errorClass}>
                <input ref={refName} type={type} className="form-control"
                       placeholder={placeholder} name={name} required=""/>
                {this.renderErrors(this.props.errors[name])}
            </div>
        )
    }

    render() {
        let content;
        if (!this.props.passwordResetRequested) {
            // If password reset has not been requested
            let submitButton;
            if (this.props.isProcessing) {
                submitButton = (
                    <button className="btn btn-default submit primary-btn" disabled="disabled">
                        Processing <Spinner/>
                    </button>
                )
            } else {
                submitButton = (
                    <button type="submit" className="btn btn-default submit primary-btn">
                        Reset password
                    </button>
                )
            }
            content = (
                <form id="password-reset" onSubmit={this.onSubmitRequest}>
                    {this.renderInput('email', 'email', 'email', 'email')}
                    {this.renderErrors(this.props.errors.non_field_errors)}
                    {submitButton}
                </form>
            )

        } else {
            // If password reset has been requested
            content = (
                <div style={{maxWidth: "500px"}}>
                    <h3 className="subtle-color">
                        You will receive an email with a link to reset your password.
                        Please follow the instructions inside to set a new password.
                    </h3>
                    <Link to="/" className="btn btn-default submit primary-btn">OK</Link>
                </div>
            )

        }

        return (
            <section className="fs-black fl fl-abs-centered">
                <div className="fl fl-abs-centered">
                    <Link to="/" className="brand">PushTrace</Link>
                    <div className="form-container">
                        { content }
                        <div id="extra-links">
                            <NavLink name="signIn" className="fp-link">Sign in</NavLink>
                            <NavLink name="signUp" className="su-link">Sign up</NavLink>
                        </div>

                    </div>

                </div>
            </section>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    const authState = state.get('auth').toJS()
    return {
        params: ownProps.params,
        isProcessing: authState.isProcessing,
        passwordResetRequested: authState.passwordResetRequested,
        errors: authState.errors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestResetPassword: (passwordResetData) => {
            dispatch(sendPasswordResetAC.request(passwordResetData))
        },
        cleanErrors: () => {dispatch(cleanAuthErrorsAC())}
    }
}


const RequestPasswordReset = connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestPasswordResetPresentation);

export default RequestPasswordReset

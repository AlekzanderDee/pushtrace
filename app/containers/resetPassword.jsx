import { toJS } from 'immutable';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { resetPasswordAC, cleanAuthErrorsAC } from '../redux/actions/auth'

import NavLink from '../components/navLink'
import Spinner from '../components/spinner'

class PasswordResetPresentation extends React.Component {

    componentWillMount() {
        this.props.cleanErrors()
    }

    onSubmitReset = (e) => {
        e.preventDefault()
        this.props.resetPassword({
            id: this.props.params.id,
            token: this.props.params.token,
            password1: this.refs.password1.value,
            password2: this.refs.password2.value
        })
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
        let content;
        if (!this.props.passwordResetCompleted) {
            content = (
                <form id="password-reset" onSubmit={this.onSubmitReset}>
                    {this.renderInput('password1', 'password', 'password1', 'password')}
                    {this.renderInput('password2', 'password', 'password2', 'confirm password')}
                    {this.renderErrors(this.props.errors.non_field_errors)}
                    {submitButton}
                </form>
            )
        } else {
            content = (
                <div style={{maxWidth: "300px"}}>
                    <h3 className="subtle-color">
                        Password has been changed successfully.
                    </h3>
                    <Link to="/" className="btn btn-default submit primary-btn">OK</Link>
                </div>
            )
        }


        return (
            <section className="fs-black fl fl-abs-centered">
                <div className="fl fl-abs-centered">
                    <Link to="/" className="brand">PushTrace</Link>
                    <div className="form-container" style={{maxWidth: "300px"}}>
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
        passwordResetCompleted: authState.passwordResetCompleted,
        errors: authState.errors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (passwordResetData) => {
            dispatch(resetPasswordAC.request(passwordResetData))
        },
        cleanErrors: () => {dispatch(cleanAuthErrorsAC())}
    }
}


const PasswordReset = connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordResetPresentation);

export default PasswordReset

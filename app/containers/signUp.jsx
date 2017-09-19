import { toJS } from 'immutable';

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import jstz from 'jstz';
import _ from 'lodash'

import { signupAC, cleanAuthErrorsAC } from '../redux/actions/auth'

import NavLink from '../components/navLink'
import Spinner from '../components/spinner'

const timezone = jstz.determine();


class SignUpPresentation extends React.Component {

    static defaultProps = {
        inviteCode: "",
    }

    componentWillMount() {
        this.props.cleanErrors()
    }

    onSubmitClick = (e) => {
        e.preventDefault();
        let formData = {
            first_name: this.refs.first_name.value,
            last_name: this.refs.last_name.value,
            timezone: this.refs.timezone.value,
            password1: this.refs.password1.value,
            password2: this.refs.password2.value,
        }
        if (!this.props.inviteCode) {
            formData.company = this.refs.company.value
            formData.email = this.refs.email.value
        } else {
            formData.invite_code = this.refs.inviteCode.value
        }

        this.props.submit(formData)
    };

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
                    Signing up <Spinner/>
                </button>
            )
        } else {
            submitButton = (
                <button type="submit" className="btn btn-default submit primary-btn">
                    Sign up
                </button>
            )
        }
        return (
            <section className="fs-black fl fl-abs-centered">
                <div className="fl fl-abs-centered">
                    <Link to="/" className="brand">PushTrace</Link>
                    <div className="form-container">
                        <form id="sign-up" onSubmit={this.onSubmitClick}>
                            {!this.props.inviteCode && this.renderInput('company', 'text', 'company', 'company')}
                            {this.renderInput('first_name', 'text', 'first_name', 'first name')}
                            {this.renderInput('last_name', 'text', 'last_name', 'last name')}

                            <input ref="timezone" type="hidden" readOnly="true" placeholder="timezone"
                                   name="timezone" value={timezone.name()}/>

                            {this.props.inviteCode && <input ref="inviteCode" type="hidden" readOnly="true" placeholder=""
                                   name="inviteCode" value={this.props.inviteCode}/>}

                            {!this.props.inviteCode && this.renderInput('email', 'email', 'email', 'email')}
                            {this.renderInput('password1', 'password', 'password1', 'password')}
                            {this.renderInput('password2', 'password', 'password2', 'repeat password')}

                            {this.renderErrors(this.props.errors.non_field_errors)}
                            {submitButton}

                        </form>
                        <div id="extra-links">
                            <NavLink name="signIn" className="su-link">Sign in</NavLink>
                            <NavLink name="requestPasswordReset" className="fp-link">Forgot password?</NavLink>
                        </div>

                    </div>
                </div>
            </section>
        );
    }
}

SignUpPresentation.propTypes = {
    isProcessing: React.PropTypes.bool.isRequired,
    errors: React.PropTypes.object.isRequired,
    inviteCode: React.PropTypes.string,

    submit: React.PropTypes.func.isRequired,
    cleanErrors: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const authState = state.get('auth').toJS()
    return {
        inviteCode: ownProps.inviteCode,
        isProcessing: authState.isProcessing,
        errors: authState.errors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submit: (data) => {
            dispatch(signupAC.request(data))
        },
        cleanErrors: () => {dispatch(cleanAuthErrorsAC())}
    }
}


const SignUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpPresentation);

export default SignUp

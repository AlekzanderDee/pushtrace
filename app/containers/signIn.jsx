import { toJS } from 'immutable'
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signinAC, cleanAuthErrorsAC } from '../redux/actions/auth'

import NavLink from '../components/navLink'
import Spinner from '../components/spinner'


class SignInPresentation extends React.Component {
    constructor(props) {
        super(props);
        // Manually bind this method to the component instance...
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    componentWillMount() {
        this.props.cleanErrors()
    }

    onSubmitClick(e) {
        e.preventDefault()
        this.props.submit({email: this.refs.email.value, password: this.refs.password.value})
        this.refs.password.value = ''
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
                    Signing in <Spinner/>
                </button>
            )
        } else {
            submitButton = (
                <button type="submit" className="btn btn-default submit primary-btn">
                    Sign in
                </button>
            )
        }

        return (
            <section className="fs-black fl fl-abs-centered">
                <div className="fl fl-abs-centered">
                    <Link to="/" className="brand">PushTrace</Link>
                    <div className="form-container">
                        <form id="sign-in" onSubmit={this.onSubmitClick}>
                            {this.renderInput('email', 'email', 'email', 'email')}
                            {this.renderInput('password', 'password', 'password', 'password')}
                            {this.renderErrors(this.props.errors.non_field_errors)}
                            {submitButton}

                        </form>
                        <div id="extra-links">
                            <NavLink name="signUp" className="su-link">Sign up</NavLink>
                            <NavLink name="requestPasswordReset" className="fp-link">Forgot password?</NavLink>
                        </div>

                    </div>

                </div>
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const authState = state.get('auth').toJS()
    return {
        isProcessing: authState.isProcessing,
        retCode: authState.retCode,
        errors: authState.errors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submit: (data) => {
            dispatch(signinAC.request(data))
        },
        cleanErrors: () => {dispatch(cleanAuthErrorsAC())}
    }
}


const SignIn = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInPresentation);

export default SignIn

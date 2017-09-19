import { toJS } from 'immutable';
import React from 'react'
import { connect } from 'react-redux'
import NavLink from '../components/navLink';
import Spinner from '../components/spinner'

import { confirmEmailAC } from '../redux/actions/emailConfirmation'

class EmailConfirmationPresentation extends React.Component {

    componentDidMount() {
        this.props.confirmEmail({confirmationId: this.props.confirmationId})
    }

    render() {
        let content;
        if (this.props.isProcessing){
            content = <Spinner/>
        } else {
            content = (
                <div className="margin-md fl fl-column fl-abs-centered ">
                    <p>
                        {this.props.message}
                    </p>
                    <NavLink name="signIn" className="btn primary-btn btn-lg margin-lg-vert padding-md-hor">
                        Sign in...
                    </NavLink>
                </div>
            )
        }
        return (
            <section id="email-conf-sent" className="fs-black fl fl-column fl-abs-centered padding-xlg-bottom">
                <h2 className="padding-md">Email confirmation</h2>
                { content }
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const emailConfState = state.get('emailConfirmation').toJS()
    return {
        confirmationId: ownProps.params.confirmationId,
        isProcessing: emailConfState.isProcessing,
        message: emailConfState.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        confirmEmail: (data) => {
            dispatch(confirmEmailAC.request(data))
        }
    }
}


const EmailConfirmation = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmailConfirmationPresentation);

export default EmailConfirmation

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { BACKEND_API_URI } from '../../utils/settings'


import { ajaxPOST } from '../../utils/ajaxActions'
import { signoutAC } from '../../redux/actions/auth'

import NavLink from '../../components/navLink'
import Spinner from '../../components/spinner'
import SignUpForm from '../signUp'


class InviteAcceptPresentation extends React.Component {

    state = {
        isProcessing: true,
        userBit: -1,
        errorFlag: false,
        errorMessage: "",
    }

    componentWillMount() {
        let r = ajaxPOST({url: BACKEND_API_URI+'invites/'+this.props.params.inviteId+'/accept/', data: {}})
            .then(res => {
                const newUserBit = res.body.data
                // 0 - sign up is needed (user with email from invite does not exist)
                // 1 - invite belongs to the current user rom request, and invite has been accepted successfully
                // 2 - invite belongs to a different user (other then user from the request),
                //     invite has been accepted but frontend needs to signOut the current user
                if (newUserBit != 1) {
                    this.props.signOut()
                }
                this.setState({isProcessing: false, userBit: res.body.data})
            })
            .catch((err) => {
                this.setState({isProcessing: false, errorFlag: true, errorMessage: err.response.body.data})
            })
    }


    render() {

        // there is no registered user with the email from the invite, so we have to signUp a new one
        if (!this.state.errorFlag && this.state.userBit === 0) {
            return <SignUpForm inviteCode={this.props.params.inviteId}/>
        }

        let message = "";
        let extraLinks = ""

        if (!this.state.errorFlag) {
            message = "Invite has been accepted."

            if (this.state.userBit == 2) {
                extraLinks = (
                    <div id="extra-links">
                        <NavLink name="signIn" className="su-link">Sign in</NavLink>
                        <NavLink name="requestPasswordReset" className="fp-link">Forgot password?</NavLink>
                    </div>
                )
            }
        } else {
            message = this.state.errorMessage
        }

        const content = (
            <div className="fl fl-abs-centered">
                <Link to="/" className="brand">PushTrace</Link>
                <div className="invite-accept__content">
                    <p className="invite-accept__content_message">
                        {message}
                    </p>
                    <Link to="/" className="btn primary-btn padding-md-hor">Ok</Link>
                    {extraLinks}
                </div>
            </div>
        )

        return (
            <section className="invite-accept fs-black fl fl-abs-centered">
                {this.state.isProcessing && <Spinner/>}
                {!this.state.isProcessing && content}
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signoutAC())
        },
    }
}


const InviteAccept = connect(
    mapStateToProps,
    mapDispatchToProps
)(InviteAcceptPresentation);

export default InviteAccept;

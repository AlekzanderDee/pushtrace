import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

class PasswordResetSentPresentation extends React.Component {


    render() {

        return (
            <section id="email-conf-sent" className="fs-black fl fl-column fl-abs-centered padding-xlg-bottom">
                <h2 className="padding-md">Password reset</h2>
                <div className="margin-md fl fl-column fl-abs-centered ">
                    <p >
                        You will receive an email with the instructions to reset your password.
                    </p>
                </div>

                 <Link to="/" className="btn primary-btn btn-lg margin-lg-vert padding-md-hor">Home</Link>
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


const PasswordResetSent = connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordResetSentPresentation);

export default PasswordResetSent

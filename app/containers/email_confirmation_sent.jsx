import { toJS } from 'immutable';
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

class EmailConfirmationSentPresentation extends React.Component {


    render() {

        return (
            <section id="email-conf-sent" className="fs-black fl fl-column fl-abs-centered padding-xlg-bottom">
                <h2 className="padding-md">You have been signed up</h2>
                <div className="margin-md fl fl-column fl-abs-centered ">
                    <p >
                        {this.props.message}
                    </p>
                </div>

                 <Link to="/" className="btn primary-btn btn-lg margin-lg-vert padding-md-hor">Got it!</Link>
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        message: state.get('auth').toJS().payload.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


const EmailConfirmationSent = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmailConfirmationSentPresentation);

export default EmailConfirmationSent

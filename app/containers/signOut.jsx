import React from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signoutAC } from '../redux/actions/auth'


class SignOutPresentation extends React.Component {

    componentWillMount() {
        this.props.signOut()
        browserHistory.push('/')
    }

    render() {
        return (
            <div/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signoutAC())
        },
    }
}


const SignOut = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignOutPresentation);

export default SignOut

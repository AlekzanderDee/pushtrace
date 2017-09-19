import React from 'react'
import { Link } from 'react-router';

import { connect } from 'react-redux'
import Collapse from 'react-collapse'

import NavButton from './navButton'
import MenuButton from '../../components/burgerMenuButton'

class NavbarPresentation extends React.Component {

    render() {
        let btns;
        if (this.props.isAuthenticated === true) {
            btns = (
                <li>
                    <NavButton name="projects" btnText="Projects"/>
                    <NavButton name="accountSettings" btnText="Account"/>
                    <NavButton name="signOut" btnText="Sign Out"/>
                </li>
            )
        } else {
            btns = (
                <li>
                    <NavButton name="signIn" btnText="Sign In"/>
                    <NavButton name="signUp" btnText="Sign Up"/>
                </li>
            )
        }

        let collapseOpened = true
        if (!this.props.isVisible) {
            collapseOpened = false
        }

        return (
            <Collapse isOpened={collapseOpened}>
                <div className="navbar">
                    <Link to="/" className="navbar-brand">Pushtrace</Link>
                    <MenuButton/>
                    <ul>
                        {btns}
                    </ul>
                </div>
            </Collapse>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.get('auth').get('isAuthenticated'),
        isVisible: state.get('navbar').get('isVisible')
    }
}


const Navbar = connect(
    mapStateToProps,
)(NavbarPresentation);


export default Navbar;

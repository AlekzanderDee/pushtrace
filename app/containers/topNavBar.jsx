import React from 'react'
import { connect } from 'react-redux'

import {toggleSideMenu} from '../redux/actions/sideMenu'
import {logout} from '../redux/actions/auth'


class TopNavBarPresentation extends React.Component {

    render() {
        return (
            <nav className="nav-top">
                <ul className="subnav-left">
                    <li>
                        <a className="brand" href="/">
                            <p>Houston</p>
                        </a>
                    </li>
                    <li>
                        <div className="bm-toggle" onClick={this.props.toggleSideMenu}>
                            <div className="icon-bar"></div>
                            <div className="icon-bar"></div>
                            <div className="icon-bar"></div>
                        </div>
                    </li>
                </ul>

                <ul className="subnav-right">
                    <li>
                        <a href="/">Profile</a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" onClick={this.props.logOut}>Log Out</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSideMenu: () => dispatch(toggleSideMenu()),
        logOut: () => dispatch(logout())
    }
}

const TopNavBar = connect(
    ()=>({}),
    mapDispatchToProps
)(TopNavBarPresentation);

export default TopNavBar

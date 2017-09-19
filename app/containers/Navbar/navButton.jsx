import React from 'react'
import { connect } from 'react-redux'

import NavLink from '../../components/navLink'


class NavButton extends React.Component {
    render() {

        let iconCls = ''
        let btnText = ''
        switch (this.props.name) {
            case 'signIn':
                iconCls = 'navbar-btn-icon fa fa-sign-in fa-lg'
                btnText = this.props.btnText
                break;
            case 'signOut':
                iconCls = 'navbar-btn-icon fa fa-sign-out fa-lg'
                btnText = this.props.btnText
                break;
            case 'accountSettings':
                iconCls = 'navbar-btn-icon fa fa-user fa-lg'
                btnText = this.props.btnText
                break;
            case 'projects':
                iconCls = 'navbar-btn-icon fa fa-th fa-lg'
                btnText = this.props.btnText
                break;
            default:
                iconCls = 'navbar-btn-icon fa fa-circle-thin fa-lg'
                btnText = this.props.btnText || ''
                break
        }

        return (
            <NavLink name={this.props.name} className="btn navbar-btn">
                <span className={iconCls}></span>
                <span>{btnText}</span>
            </NavLink>
        )
    }
}

export default NavButton;

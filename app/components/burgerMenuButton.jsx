import { toJS } from 'immutable';

import React from 'react'
import { Link } from 'react-router';

import { connect } from 'react-redux'
import { toggleSideMenu } from '../redux/actions/sideMenu'


class BurgerButtonPresentation extends React.Component {

    onButtonClick = (e) => {
        e.preventDefault()
        this.props.toggleSideMenu()
    }

    render() {

        if (this.props.isPinned || !this.props.menuItems) {
            return <span></span>
        }

        const openCls = this.props.isOpen && " --open" || ""
        return (
           <span className={"bm-button fa fa-fw fa-bars" + openCls} onClick={this.onButtonClick}/>
        )
    }

}


const mapStateToProps = (state) => {
    const sideMenuState = state.get('sideMenu').toJS()
    return {
        isOpen: sideMenuState.isOpen,
        isPinned: sideMenuState.isPinned,
        menuItems: sideMenuState.items,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSideMenu: () => {dispatch(toggleSideMenu())},
    }
}

const BurgerButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(BurgerButtonPresentation);


export default BurgerButton;

import _ from 'lodash'
import { toJS } from 'immutable';
import React from 'react'
import { connect } from 'react-redux'

import BurgerMenu from 'react-burger-menu'
import {  toggleSideMenu, togglePinnedMode, closeSideMenu} from '../redux/actions/sideMenu'

class SideMenuPresentation extends React.Component {


    setMenuState = (state) => {
        if (state.isOpen != this.props.isOpen) {
            this.props.toggleSideMenu()
        }
    }

    togglePin = (e) => {
        e.preventDefault()
        this.props.togglePinnedMode()
    }

    closeSideMenu = (e) => {
        e.preventDefault()
        this.props.closeSideMenu()
    }


    render() {
        const Menu = BurgerMenu.slide
        const pinnedClass = !!this.props.isPinned && " --pinned" || ""

        return (
            <section className={"bm-menu-wrapper"+pinnedClass}>

                <Menu isOpen={this.props.isOpen} customBurgerIcon={false} onStateChange={ this.setMenuState }
                      customCrossIcon={ false } noOverlay={this.props.isPinned}>

                    <div className="bm-menu__inline-controls">
                        {this.props.title &&
                            <span className="bm-menu__inline-controls__title"> {this.props.title}</span>
                        }
                        {this.props.isPinned &&
                            <span className="bm-menu__inline-controls__close" onClick={this.closeSideMenu}/>
                        }
                        <span className="bm-menu__inline-controls__pin" onClick={this.togglePin}></span>
                    </div>

                    {!_.isEmpty(this.props.items) && this.props.items}
                </Menu>

            </section>
        );
    }

}

const mapStateToProps = (state) => {
    const sideMenuState = state.get('sideMenu').toJS()
    return {
        isOpen: sideMenuState.isOpen,
        isPinned: sideMenuState.isPinned,
        title: sideMenuState.title,
        items: sideMenuState.items,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        togglePinnedMode: () => {dispatch(togglePinnedMode())},
        closeSideMenu: () => {dispatch(closeSideMenu())},
        toggleSideMenu: () => {dispatch(toggleSideMenu())},
    }
}

const SideMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(SideMenuPresentation);

export default SideMenu

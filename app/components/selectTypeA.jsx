import React from 'react';

class Select extends React.Component {

    state = {
        active: false
    }

    selectClick = (e) => {
        e.preventDefault()
        this.setState({active: !this.state.active})
    }

    render() {
        const activeCls = this.state.active && ' active' || ''
        return (
            <div className={"wrapper-dropdown-3" + activeCls} onClick={this.selectClick} tabindex="1">
                <span>Transport</span>
                <ul className="dropdown">
                    <li><a href="#">Classic mail</a></li>
                    <li><a href="#">Private jet</a></li>
                    <li><a href="#">UPS Delivery</a></li>

                </ul>
            </div>
        )
    }

}

export default Select;

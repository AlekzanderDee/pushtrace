import React from 'react';


export default class ListItem extends React.Component {

    onClick = (e) => {
        e.preventDefault()
        this.props.clickCB(this.props.id)
    }

    render() {

        const activeClass = this.props.isActive && " --active" || ""

        return (
            <div id={this.props.id} className={"project-users__body__user-item"+activeClass} onClick={this.onClick}>
                <span className="project-users__body__user-item__text">{this.props.text}</span>
                {this.props.iconClass &&
                    <i className={"project-users__body__user-item__icon " + this.props.iconClass}/>
                }
            </div>
        )
    }


}

ListItem.propTypes = {
    isActive: React.PropTypes.bool.isRequired,
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    iconClass: React.PropTypes.string,

    clickCB: React.PropTypes.func,
};

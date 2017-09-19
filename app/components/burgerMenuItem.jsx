import React from 'react'

import Collapse from 'react-collapse'

class BurgerMenuItem extends React.Component {
    constructor(props) {
        super(props);
        // Manually bind this method to the component instance...
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {isOpen: false}
      }

    toggleMenu(e) {
        e.preventDefault()
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        let activeHeaderCls = this.props.isActive && ' --active' || ''
        let nestedItems;
        let itemHead;
        let arrow;
        if (this.props.children.length > 1) {
            itemHead = this.props.children[0]
            activeHeaderCls += this.state.isOpen && " --opened" || " --closed"
            nestedItems = this.props.children.slice(1)
            arrow = <span className={"bm-item-arrow fa fa-angle-right "+(this.state.isOpen && "open" || "closed")}></span>
        } else {
            itemHead = this.props.children
        }



        return (
            <div className="bm-item" onClick={this.props.onItemClick}>
                <div className={"bm-item-head" + activeHeaderCls} onClick={nestedItems && this.toggleMenu}>
                    {itemHead}
                    {arrow}
                </div>
                {
                    nestedItems &&
                    <div className="bm-item-children">
                        <Collapse isOpened={this.state.isOpen}>
                            {nestedItems.map(function(child, ind) {
                                return <span key={ind} className="bm-item-child">{child}</span>
                            })}
                        </Collapse>
                    </div>
                }
            </div>
        )
    }
}

export default BurgerMenuItem

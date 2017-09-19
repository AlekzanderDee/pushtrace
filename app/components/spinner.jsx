import React from 'react'

class Spinner extends React.Component {

    render() {
        switch (this.props.size) {
            case 'lg':
                return (
                <i className="fa fa-spinner fa-3x fa-spin" aria-hidden="true"></i>
            )

            case 'md':
                return (
                <i className="fa fa-spinner fa-2x fa-spin" aria-hidden="true"></i>
            )
            case 'sm':
            default:
                return (
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
            )
        }
    }
}

export default Spinner

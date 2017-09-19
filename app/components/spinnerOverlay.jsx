import React from 'react'

class Spinner extends React.Component {

    static defaultProps = {
        size: 1,
    }
    static propTypes = {
        size: React.PropTypes.number,
    }

    render () {
        return (
            <div className="spinner-ol">
                <i className={"fa fa-spinner fa-spin fa-" + this.props.size + "x"}></i>
            </div>
        )
    }
}

export default Spinner

import React from 'react';


export default class UnderlinedSelect extends React.Component {

    state = {
        value: this.props.value
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.value != nextProps.value) {
            this.setState({value: nextProps.value || ''})
        }
    }

    onSelectChange = (e) => {
        e.preventDefault()
        this.setState({value: e.target.value})
        this.props.onChange && this.props.onChange(e)
    }

    render() {

        const groupClasses = "ul-select-group " + (this.props.extraGrpClasses || "")

        return (
            <div className={groupClasses}>
                <select name={this.props.name} className="ul-select-group__select" value={this.state.value} onChange={this.onSelectChange}>
                    {this.props.options.map((option, ind) => {
                        return <option key={ind} value={option}>{option}</option>
                    })}
                </select>
                <label className="ul-select-group__label">{this.props.labelText}</label>
            </div>
        )
    }
}
UnderlinedSelect.PropTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    labelText: React.PropTypes.string.isRequired,

    onChange: React.PropTypes.func,
    extraGrpClasses: React.PropTypes.string,
}

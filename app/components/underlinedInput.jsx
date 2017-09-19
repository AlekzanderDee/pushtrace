import React from 'react';


export default class UnderlinedInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value || ''};
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.value != nextProps.value) {
            this.setState({value: nextProps.value || ''})
        }
    }

    onInputChange = (e) => {
        this.setState({value: e.target.value});
        this.props.onChange && this.props.onChange(e)
    }

    render() {
        const groupClasses = "ul-input-group " + (this.props.extraGrpClasses || "")
        let inputProps = {
            className: "ul-input-group__input",
            name: this.props.name,
            type: this.props.type,
            placeholder: this.props.placeholder,
            onChange: this.onInputChange,
            value: this.state.value
        }

        if (this.props.disabled === true){
            inputProps.disabled = "true"
        }
        return (
            <div className={groupClasses}>
                <input {...inputProps}/>
                <label className="ul-input-group__label">{this.props.labelText}</label>
            </div>
        )
    }
}

UnderlinedInput.PropTypes = {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    labelText: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    disabled: React.PropTypes.bool,

    onChange: React.PropTypes.func,
    extraGrpClasses: React.PropTypes.string,
}

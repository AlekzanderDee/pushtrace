import React from 'react';

class EditableLabel extends React.Component {

    static defaultProps = {
        id: "",
        name: "",
        content: "",
        cntClass: "", // container class (col-sm-3 etc),
        labelClass: "", // label classes
        pencilClass: "", // span classes
        onChange: null,
        placeholder: '. . .',
    }

    state = {
        isEditing: false,
        content: this.props.content,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({content: nextProps.content})
    }


    onKeyUp = (event) => {
        if (event.keyCode === 13 || event.keyCode === 27){
            this.stopEdit(event)
        }
    }

    startEdit = () => {
        this.setState({isEditing: true})
    }

    stopEdit = (event) => {
        this.setState({isEditing: false, content: event.target.value})
        this.props.onChange(this.props.id, event.target.value)

    }

    render (){
        if (this.state.isEditing === true){
            return <div className={this.props.cntClass + ' editable-element'}>
                        <input className={"form-control  "+this.props.labelClass} id={this.props.id}
                               name={this.props.name} type="text" defaultValue={this.state.content}
                               onBlur={this.stopEdit} onKeyUp={this.onKeyUp}
                               ref={function(el) {
                                  if (el != null) {
                                    if (typeof el.selectionStart == "number") {
                                        el.selectionStart = el.selectionEnd = el.value.length;
                                    } else if (typeof el.createTextRange != "undefined") {
                                        el.focus();
                                        var range = el.createTextRange();
                                        range.collapse(false);
                                        range.select();
                                    }
                                    el.focus();
                                  }
                                }}
                        />
                    </div>
        } else {
            // In case we have empty content we should display
            // some placeholder
            var labelText = this.state.content ? this.state.content : this.props.placeholder
            var classes = this.props.cntClass + ' editable-element'
            return <div className={classes} onClick={this.startEdit}>
                        <label id={this.props.id} className={this.props.labelClass}>
                            {labelText}
                        </label>
                        <i className={"fa fa-pencil pull-right " + this.props.pencilClass} aria-hidden="true"></i>
                    </div>
        }
    }
}

export default EditableLabel;

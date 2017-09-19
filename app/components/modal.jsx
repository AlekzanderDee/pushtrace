import { toJS } from 'immutable';

import React from 'react';
import { connect } from 'react-redux';

import SimpleModal, {closeStyle} from 'simple-react-modal'
import  { closeModalAC } from '../redux/actions/modal'


class ModalPresentation extends React.Component {

    render () {
        var containerClassName = 'hel-modal '
        if (this.props.size === 'small'){
            containerClassName += 'small '
        }
        // prevent scrolling background
        if (this.props.isOpen){
            document.body.className += " modal-open"
        } else {
            document.body.className = document.body.className.replace("modal-open", "")
        }
        return (
            <SimpleModal show={this.props.isOpen} onClose={this.props.closeModal}
                         containerClassName={containerClassName}>

                <a style={closeStyle} onClick={this.props.closeModal}>X</a>
                {this.props.content}

            </SimpleModal>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const modalState = state.get('modal').toJS()
    return {
        isOpen: modalState.isOpen,
        content: modalState.content,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal : () => dispatch(closeModalAC())

    }
}


const Modal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalPresentation);

export default Modal;

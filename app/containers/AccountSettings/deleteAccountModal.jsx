import React from 'react';
import { connect } from 'react-redux';

import  { closeModalAC } from '../../redux/actions/modal'
import { deleteAccountAC, cleanAuthErrorsAC } from '../../redux/actions/auth'



class DeleteAccountModalPresentation extends React.Component {

    deleteAccount = e => {
        e.preventDefault()
        this.props.deleteAccount({password: this.refs.password.value})
    }

    render () {
        let cancelButtonProps = {
            className: "btn primary-btn",
            onClick: (e) => {
                this.props.cleanAuthErrors()
                this.props.closeModal()
            }
        }

        let deleteButtonProps = {
            className: "btn secondary-btn pull-right",
            onClick: this.deleteAccount
        }

        if (this.props.isProcessing === true) {
            cancelButtonProps.disabled = 'disabled'
            deleteButtonProps.disabled = 'disabled'
        }

        return (
            <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">Delete account</h3>
                </div>
                <div className="panel-body">
                     <div className="text-center text-danger">
                        <span className="fa fa-warning"/> This action cannot be undone!
                    </div>
                    <div className="text-center ">
                        Do you want to delete your account?
                    </div>
                    <div className="row">
                        <div className="col-sm-8 col-centered margin-md-top">
                            <form method="POST" action="" onSubmit={this.deleteAccount}>
                                <input ref="password" className="form-control" placeholder="Password" type="password" name="password"/>
                            </form>
                        </div>
                    </div>


                    {this.props.hasErrors  &&
                        <div className="text-center margin-sm-top">
                            Error: <span className="text-danger">{this.props.errors.error}</span>
                        </div>}
                </div>
                <div className="panel-footer">
                    <button {...cancelButtonProps}>Cancel</button>
                    <button {...deleteButtonProps}>Delete</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isProcessing: state.get('auth').get('isProcessing'),
        hasErrors: state.get('auth').get('hasErrors'),
        errors: state.get('auth').get('errors'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModalAC()),
        deleteAccount: data => dispatch(deleteAccountAC.request(data)),
        cleanAuthErrors: () => dispatch(cleanAuthErrorsAC())
    }
}


const DeleteAccountModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteAccountModalPresentation);

export default DeleteAccountModal

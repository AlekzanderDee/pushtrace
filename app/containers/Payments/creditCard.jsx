import React from 'react';
import { connect } from 'react-redux';

import  { deleteCardInfoAC, setDefaultCardAC }  from '../../redux/actions/card'
import {setModalContentAC, openModalAC, closeModalAC} from '../../redux/actions/modal'

import visaLogo from '../../img/payment_logos/Visa.png'
import americanExpressLogo from '../../img/payment_logos/American Express.png'
import dinersClubLogo from '../../img/payment_logos/Diners Club.png'
import discoverLogo from '../../img/payment_logos/Discover.png'
import jscLogo from '../../img/payment_logos/JCB.png'
import masterCardLogo from '../../img/payment_logos/MasterCard.png'

import TokenManager from '../../utils/authTokenManager'

class CreditCardPresentation extends React.Component {

    deleteCard = (e) => {
        if (!TokenManager.getTokenPayload().is_account_holder) { return }
        e.preventDefault()
        this.props.deleteCardInfo(this.props.id)
        this.props.closeModal()
    }

    onCardDeleteClick = (e) => {
        e.preventDefault()
        const modalContent = (
            <div className="modal-delete-card">
                <div className="modal-delete-card__body">
                    <p>Delete card that ends with <span>{this.props.last4}</span>?</p>
                </div>

                <div className="modal-delete-card__footer">
                    <button className="btn primary-btn" onClick={this.deleteCard}>Confirm</button>
                    <button className="btn secondary-btn" onClick={this.props.closeModal}>Cancel</button>
                </div>

            </div>
        )

        this.props.setModalContent(modalContent)
        this.props.openModal()
    }

    onSetDefaultCardClick = (e) => {
        e.preventDefault()
        this.props.setDefaultCard({card_id: this.props.id})
    }

    render () {
        let brandIcon;
        switch (this.props.brand) {
            case 'Visa':
                brandIcon =  <img src={visaLogo}/>
                break;
            case 'American Express':
                brandIcon =  <img src={americanExpressLogo}/>
                break;
            case 'MasterCard':
                brandIcon =  <img src={masterCardLogo}/>
                break;
            case 'Discover':
                brandIcon =  <img src={discoverLogo}/>
                break;
            case 'JCB':
                brandIcon =  <img src={jscLogo}/>
                break;
            case 'Diners Club':
                brandIcon =  <img src={dinersClubLogo}/>
                break;
        }

        return (
            <div className="credit-card">
                <div className="credit-card__header">
                    <span className={"credit-card__header__default-label "+(this.props.isDefault && "--default") || "" }
                          onClick={this.onSetDefaultCardClick}>
                        Default
                    </span>
                </div>
                <div className="credit-card__body">
                    <small>{'**** **** **** ' + this.props.last4}</small>
                    <small>valid thru</small>
                    <small>{this.props.expMonth + '/' + this.props.expYear}</small>
                </div>
                <div className="credit-card__footer">
                    {brandIcon}
                    <span className="delete-card" onClick={this.onCardDeleteClick}>
                        Delete
                    </span>
                </div>
            </div>
        )
    }
}

CreditCardPresentation.propTypes = {
    id: React.PropTypes.string.isRequired,
    isDefault: React.PropTypes.bool.isRequired,
    brand: React.PropTypes.string.isRequired,
    last4: React.PropTypes.string.isRequired,
    expMonth: React.PropTypes.number.isRequired,
    expYear: React.PropTypes.number.isRequired,

};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCardInfo: (data) => dispatch(deleteCardInfoAC.request(data)),
        setDefaultCard: (data) => dispatch(setDefaultCardAC.request(data)),
        setModalContent: (content) => dispatch(setModalContentAC(content)),
        openModal: () => dispatch(openModalAC()),
        closeModal: () => dispatch(closeModalAC()),
    }
}


const CreditCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditCardPresentation);

export default CreditCard;

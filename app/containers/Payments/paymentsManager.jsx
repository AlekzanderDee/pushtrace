import { toJS } from 'immutable';

import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import { STRIPE_KEY, APPLICATION_NAME } from '../../utils/settings'
import Spinner from '../../components/spinner'
import CreditCard from './creditCard'
import  { getCardInfoAC, addCardInfoAC }  from '../../redux/actions/card'
import TokenManager from '../../utils/authTokenManager'


class PaymentsManagerPresentation extends React.Component {

    onCardAdd = (e) => {
        e.preventDefault()
        if (this.props.email) {
            if (!TokenManager.getTokenPayload().is_account_holder) {
                return
            }

            const handler = window.StripeCheckout.configure({
                key: STRIPE_KEY,
                locale: 'auto',
                token: (token) => {
                    this.props.addCard({token_id: token.id})
                }
            });
            handler.open({
                name: APPLICATION_NAME,
                email: this.props.email,
                panelLabel: "Add card",
            });
        }

    }

    componentWillMount (){
        this.props.getCardInfo()
    }

    render () {
        let cards;
        if (!!this.props.isProcessing) {
            cards = <Spinner/>
        } else if (this.props.cards.length > 0) {
            cards = this.props.cards.map((card, ind) => <CreditCard key={ind}
                                                                    id={card.id}
                                                                    isDefault={card.is_default}
                                                                    brand={card.brand}
                                                                    last4={card.last4}
                                                                    expMonth={card.exp_month}
                                                                    expYear={card.exp_year}/>)
        } else {
            cards = <small>No cards added.</small>
        }
        return (
            <div id="payments-manager">
                <h4>Payment methods</h4>
                <button className="btn secondary-btn" onClick={this.onCardAdd}>Add card</button>
                <div id="payment-manager__cards">
                    {cards}
                </div>

                {!_.isEmpty(this.props.errors) &&
                    <div className="payments-manager__errors">
                        {this.props.errors.map((error, ind) => {
                            return <p className="text-danger" key={ind}>{error}</p>
                        })}
                    </div>
                }

            </div>
        )
    }
}

PaymentsManagerPresentation.propTypes = {
    email: React.PropTypes.string,

};

const mapStateToProps = (state, ownProps) => {
    const cardState = state.get('card').toJS()
    return {
        email: state.get('user').toJS().payload.email,
        isProcessing: cardState.isProcessing,
        cards: cardState.payload,
        errors: cardState.errors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCardInfo: () => dispatch(getCardInfoAC.request()),
        addCard: (data) => dispatch(addCardInfoAC.request(data)),
    }
}


const PaymentsManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentsManagerPresentation);

export default PaymentsManager;

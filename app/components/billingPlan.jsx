import React from 'react';
import { connect } from 'react-redux';

import OverlaySpinner from './spinnerOverlay'


class BillingPlanPresentation extends React.Component {

    subscribe = e => {
        !this.props.isProcessing && !this.props.isActive && this.props.onPlanClick({
            plan_uuid: this.props.id
        })
    }

    render() {
        const selectedCls = this.props.isActive === true && !this.props.isProcessing && ' --selected ' || ''
        const activeCls = !this.props.isProcessing && ' --active ' || ''
        const spinner = this.props.isProcessing && <OverlaySpinner size={3}/>

        return (
            <div>
                {spinner}
                <div className={"billing-plan " + selectedCls + activeCls}>
                    <div className="billing-plan__header">
                        <p className="billing-plan__header__title">{this.props.name}</p>
                        <p className="billing-plan__header__amount">
                            ${this.props.amount}<span className="interval">/{this.props.interval}</span>
                        </p>
                    </div>

                    <div className="billing-plan__body">
                        {this.props.features.map((feature, ind) => <p key={ind}>{feature}</p>)}
                    </div>

                    <div className="billing-plan__footer">
                        <button className="billing-plan__footer__subscribe fa fa-check fa-2x"
                                onClick={this.subscribe}></button>
                    </div>
                </div>

            </div>
        )
    }
}

BillingPlanPresentation.propTypes = {
    id: React.PropTypes.string.isRequired,
    interval: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired,
    features: React.PropTypes.array.isRequired,
    isProcessing: React.PropTypes.bool.isRequired,
    isActive: React.PropTypes.bool.isRequired,

    onPlanClick: React.PropTypes.func.isRequired,
};

// const mapStateToProps = (state, ownProps) => {
//     return {
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//     }
// }


const BillingPlan = connect(
    // mapStateToProps,
    // mapDispatchToProps
)(BillingPlanPresentation);


export default BillingPlan;

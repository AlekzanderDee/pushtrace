import React from 'react';
import { connect } from 'react-redux';

import BillingPlan from '../../components/billingPlan'
import PaymentsManager from '../payments/paymentsManager'
import {getBillingPlansAC, subscribeToBillingPlanAC} from '../../redux/actions/billingPlan'

class BillingSettingsPresentation extends React.Component {

    componentWillMount() {
        this.props.getPlansList()
    }

    render() {

        let plans;
        if (this.props.plansInfo.count && this.props.plansInfo.count > 0) {
            plans = this.props.plansInfo.results.map(
                (plan, ind) => <BillingPlan key={ind} id={plan.uuid} name={plan.name} amount={plan.amount/100}
                                            interval={plan.interval} isActive={plan.is_active}
                                            isProcessing={this.props.isProcessing}
                                            features={["first feature","second feature","Black Jack"]}
                                            onPlanClick={this.props.onPlanClick}/>
            )
        } else {
            plans = [1,2,3].map(
                (ind) => <BillingPlan key={ind} id={""} name={"PushTrace"} amount={0}
                                      interval={'"month'} isActive={false}
                                      isProcessing={true}
                                      features={["first feature","second feature","Black Jack"]}
                                      onPlanClick={()=>{}}/>
            )
        }

        return (
            <div>
                <div id="billing-plans-container">
                    {plans}
                </div>
                {this.props.errors && <p className="text-danger">{this.props.errors.error}</p>}
                <PaymentsManager/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        plansInfo: state.get('billingPlan').get('payload'),
        errors: state.get('billingPlan').get('errors'),
        isProcessing: state.get('billingPlan').get('isProcessing')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlansList: () => dispatch(getBillingPlansAC.request()),
        onPlanClick: (planID) => dispatch(subscribeToBillingPlanAC.request(planID))
    }
}


const BillingSettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(BillingSettingsPresentation);

export default BillingSettings

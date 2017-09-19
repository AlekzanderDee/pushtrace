import React from 'react';
import { connect } from 'react-redux';

import PersonalSettings  from './personalSettings'
import SecuritySettings  from './securitySettings'
import BillingSettings  from './billingSettings'
import protectedComponent from '../../components/protectedComponent'

import TokenManager from '../../utils/authTokenManager'


@protectedComponent()
class AccountSettingsPresentation extends React.Component {

    state = {
        activeSection: "Personal"
    }

    sectionClick = (e) => {
        e.preventDefault()
        this.setState({ activeSection: e.target.innerText})
    }

    render() {
        const personal = 'Personal';
        const billing = 'Billing';
        const security = 'Security';
        let navLinks = [personal, security, ]

        const tokenPayload = TokenManager.getTokenPayload()
        if (!!tokenPayload.is_account_holder) {
            navLinks.push(billing)
        }

        let settingsContent;
        switch (this.state.activeSection) {
            case personal:
                settingsContent = <PersonalSettings/>;
                break;
            case security:
                settingsContent = <SecuritySettings/>;
                break;
            default:
                settingsContent = <BillingSettings/>
        }

        return (
            <div id="account-settings">
                <section className="fl">
                    <div id="settings-header">
                        <h3>Account Settings</h3>
                        <hr className="no-margin"/>
                    </div>
                </section>

                <section className="fl">
                    <div id="account-settings-selector">
                        {navLinks.map((value, ind) => {
                            let activeClass = ''
                            if (this.state.activeSection == value) {
                                activeClass = 'active'
                            }
                            return (
                                <h4 key={ind} className={'pointer settings-section '+activeClass}
                                    onClick={this.sectionClick}>
                                       {value}
                                </h4>
                            )
                        })}
                    </div>
                </section>

                <section className="fl">
                    {settingsContent}
                </section>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


const AccountSettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountSettingsPresentation);

export default AccountSettings

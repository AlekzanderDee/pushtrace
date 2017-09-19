import { toJS } from 'immutable';
import React from 'react';
import  momentTZ  from 'moment-timezone';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import EditableLabel from '../../components/editableLabel'
import Select from '../../components/selectTypeB'

import { getUserInfoAC, postUserInfoAC } from '../../redux/actions/user'


class PersonalSettingsPresentation extends React.Component {

    componentWillMount (){
        this.props.getUserInfo()
    }

    receiver = (id, value) => {
        if (this.props[id] !== value) {
            let userData = {}
            userData[id] = value
            this.props.postUserInfo(userData)
        }
    }

    changeTimezone = (e) => {
        if (this.props.timezone != e.target.value) {
            let userData = {}
            userData["timezone"] = e.target.value
            this.props.postUserInfo(userData)
        }
    }

    render () {
        const timeZoneList = momentTZ.tz.names()
        return (
            <div id="account-settings-content">
                <div className="form-group">
                    <EditableLabel id="firstName"
                                   content={this.props.firstName}
                                   onChange={this.receiver}/>
                    <hr/>
                    <label>First Name</label>
                </div>

                <div className="form-group">
                    <EditableLabel id="lastName"
                                   content={this.props.lastName}
                                   onChange={this.receiver}/>
                    <hr/>
                    <label htmlFor="">Last Name</label>
                </div>

                <div className="form-group">
                    <label>{this.props.email}</label>
                    <hr/>
                    <label htmlFor="">Email</label>
                </div>

                <div className="form-group">
                    <Select value={this.props.timezone} onChange={this.changeTimezone} options={timeZoneList}/>
                    <hr/>
                    <label htmlFor="">Time Zone</label>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  const userState = state.get('user').toJS()
    return {
        email: userState.payload.email,
        firstName: userState.payload.first_name,
        lastName: userState.payload.last_name,
        timezone: userState.payload.timezone,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => {
            dispatch(getUserInfoAC.request())
        },

        postUserInfo: (data) => {
            dispatch(postUserInfoAC.request(data))
        },

    }
}


const PersonalSettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonalSettingsPresentation);

export default PersonalSettings

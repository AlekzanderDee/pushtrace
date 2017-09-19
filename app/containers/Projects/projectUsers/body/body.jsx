import _ from 'lodash'
import { toJS } from 'immutable';

import React from 'react';
import {connect} from 'react-redux';

import ListItem from './_listItem'
import AddUserForm from './forms/_addUserForm'
import EditUserForm from './forms/_editUserForm'

import OverlaySpinner from '../../../../components/spinnerOverlay'
import { MEMBERSHIP_ROLES } from '../../../../utils/settings'
import {cleanErrorsAC} from '../../../../redux/actions/projects'

class ProjectUsersBodyPresentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemId: this.props.memberships.length > 0 && this.props.memberships[0].uuid || "addUser",
        };
      }

    componentWillReceiveProps(props){
        if (!_.isEqual(this.props.memberships, props.memberships)) {
            this.setState({activeItemId: props.memberships.length > 0 && props.memberships[0].uuid || "addUser"})
        }
    }

    onListItemClick = (activeItemId) => {
        this.props.cleanErrors()
        this.setState({activeItemId: activeItemId})
    }

    render() {
        if (this.props.isProcessing && this.props.memberships.length == 0){
            return null
        }

        let canInvite = false;
        if (this.props.projectDetails.access_level != undefined) {
            canInvite = this.props.projectDetails.access_level == MEMBERSHIP_ROLES.owner
        }

        let usersList;
        let detailsContent;

        let memberships = this.props.memberships
        // applying filtering (email, first or last name)
        if (!!this.props.userFilter) {
            const filterPredicate = membership => {
                const filter = this.props.userFilter.toLowerCase()
                if (
                    membership.email.toLowerCase().includes(filter) ||
                    membership.first_name.toLowerCase().includes(filter) ||
                    membership.last_name.toLowerCase().includes(filter)
                ) {
                    return true
                } else {
                    return false
                }
            }
            memberships = _.filter(memberships, filterPredicate)
        }

        // selected membership details or add user form
        let membership = _.find(memberships, (o) => o.uuid == this.state.activeItemId)

        usersList = memberships && memberships.map((user_membership) => {

            let listItemText = ""
            if (user_membership.first_name && user_membership.last_name) {
                listItemText = [user_membership.first_name, user_membership.last_name].join(' ')
            } else {
                listItemText = user_membership.email
                if (user_membership.first_name || user_membership.last_name) {
                    listItemText += ' (' + (user_membership.first_name || user_membership.last_name) + ')'
                }
            }
            let isActive = false;
            if (membership == undefined && !(this.state.activeItemId == "addUser")) {
                isActive = true
            } else {
                isActive = this.state.activeItemId == user_membership.uuid
            }

            return <ListItem key={user_membership.uuid} isActive={isActive}
                             id={user_membership.uuid} text={listItemText}
                             clickCB={this.onListItemClick}/>
        })

        if (usersList.length == 0 && !canInvite){
            // if there are no users to display in the list and user cannot invite,
            // then display a placeholder in the list
            usersList = [
                <ListItem key="k" isActive={true} id="noUsers" text="No users" clickCB={e=>e}/>
            ]
        }

        if (membership != undefined) {
            // if possible to find the active membership then display its details
            detailsContent = (
                <div className="project-users__body__details">
                    {this.props.isProcessing && <OverlaySpinner size={2}/>}
                    <EditUserForm projectId={this.props.projectId} email={membership.email} membershipId={membership.uuid}
                                  role={membership.membership_type}/>
                </div>
            )
        } else if (this.state.activeItemId == "addUser" && !!canInvite) {
            // if `addUser` element is selected and user can invite, then display invite form
            detailsContent = (
                <div className="project-users__body__details">
                    {this.props.isProcessing && <OverlaySpinner size={2}/>}
                    <AddUserForm projectId={this.props.projectId}/>
                </div>
            )
        } else if (memberships.length != 0) {
            // if active element is not in the list of users (could be after the filtering),
            // then display details for the first membership in the result array
            membership = memberships[0]
            detailsContent = (
                <div className="project-users__body__details">
                    <EditUserForm projectId={this.props.projectId} email={membership.email} membershipId={membership.uuid}
                                  role={membership.membership_type}/>
                </div>
            )
        } else {
            // Display placeholder
            detailsContent = (
                <div className="project-users__body__details" style={{width: '270px', textAlign: 'center'}}>
                    <h3>No users</h3>
                </div>
            )
        }

        return (
            <div className="project-users__body">
                <div className="project-users__body__list">

                    {canInvite && <ListItem key="addUser" isActive={this.state.activeItemId == "addUser"} id="addUser"
                                            text="Add user" iconClass="fa fa-plus" clickCB={this.onListItemClick}/>}

                    {usersList}
                </div>

                {detailsContent}

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  const projectsState = state.get('projects').toJS()
    return {
        projectId: ownProps.projectId,
        userFilter: projectsState.userFilter,
        memberships: projectsState.users,
        isProcessing: projectsState.isProcessing,
        projectDetails: projectsState.detailsInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cleanErrors: () => {
            dispatch(cleanErrorsAC())
        },
    }
}


const ProjectUsersBody = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectUsersBodyPresentation);

export default ProjectUsersBody

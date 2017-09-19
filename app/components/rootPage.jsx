import React from 'react'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'

import urlMap from '../utils/urlManager'


class RootPagePresentation extends React.Component {

    componentWillMount() {
        if (this.props.isAuthenticated) {
            browserHistory.push(urlMap.projects)
        }
    }

   render() {
       return (
            <div/>
        )
   }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.get('auth').get('isAuthenticated'),
    }
}


const RootPage = connect(
    mapStateToProps,
)(RootPagePresentation);


export default RootPage;

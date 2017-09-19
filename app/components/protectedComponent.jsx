import React from 'react';
import {browserHistory} from 'react-router'

import urlMap from '../utils/urlManager'
import { checkIsAuthenticated } from '../utils/utils'



const protectedComponent = (Component) => {
    return class ProtectedComponent extends React.Component {

        state = {
            shouldRender: false
        }

        componentDidMount() {
            if (!checkIsAuthenticated()) {
                browserHistory.push(urlMap.signIn)
            } else {
                this.setState({shouldRender: true})
            }
        }

        render() {
            if (!!this.state.shouldRender){
                return <Component {...this.props} {...this.state} />;
            } else {
                return null
            }

        }
    };
};

export default () => {
    return (target) => protectedComponent(target);
};

import React from 'react';
import { Link } from 'react-router';

import UrlMap from '../utils/urlManager';


class NavLink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const path = UrlMap[this.props.name]
        return <Link {...this.props} to={path} activeClassName="active"/>
    }
}

NavLink.defaultProps = {'name': ''};


export default NavLink;

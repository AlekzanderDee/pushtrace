/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { ThemeProvider } from 'styled-components';

import Navbar from '../Navbar/navbar';
import Modal from '../../components/modal';

import SideMenu from '../sideMenu';
import Theme from '../../theme';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <div id="main">
          <Navbar />

          <section id="main__content">
            <SideMenu />
            {React.Children.toArray(this.props.children)}
          </section>

          <Modal />
        </div>
      </ThemeProvider>
    );
  }
}

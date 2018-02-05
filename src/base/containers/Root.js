import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import ScrollToTop from '../components/ScrollToTop';
import App from './App';

// Import styles
import 'base/styles/core.scss';

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </ConnectedRouter>
      </Provider>
    );
  }
}

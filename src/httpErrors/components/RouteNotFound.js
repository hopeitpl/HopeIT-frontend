import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { httpError } from '../redux';

class RouteNotFound extends React.Component {
  componentWillMount() {
    this.props.dispatch(httpError(404));
  }

  render() {
    return null;
  }
}

RouteNotFound.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(RouteNotFound);

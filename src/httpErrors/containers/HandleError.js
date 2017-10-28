import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Error404 from '../views/Error404';

const errors = {
  404: Error404
};

export const HandleError = ({ children, error }) => {
  if (!error) {
    return children;
  }

  const Component = error && errors[error];
  return <Component />;
};

HandleError.propTypes = {
  children: PropTypes.any,
  error: PropTypes.number
};

const select = ({ httpErrors }) => (httpErrors);

export default connect(select)(HandleError);

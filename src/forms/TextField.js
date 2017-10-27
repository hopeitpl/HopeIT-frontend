import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MaterialTextField } from 'material-ui';

export const TextField = ({ input, ...rest}) => {
  return <MaterialTextField {...rest} InputProps={input} />;
};

TextField.propTypes = {
  input: PropTypes.object
};

export default TextField;

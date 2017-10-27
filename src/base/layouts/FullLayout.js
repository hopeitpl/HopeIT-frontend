import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'material-ui';

export const FullLayout = ({ children }) => {
  return (
    <Grid container className="base-layout" justify="center" alignItems="center">
      <Grid item>
        {children}
      </Grid>
    </Grid>
  );
};

FullLayout.propTypes = {
  children: PropTypes.any
};

export default FullLayout;

import React from 'react';
import PropTypes from 'prop-types';
import FullLayout from 'base/layouts/FullLayout';
import { Typography, withStyles } from 'material-ui';

const styles = () => ({
  display4: {
    color: 'white'
  },
  display3: {
    color: 'white'
  }
});

export const Error404 = ({ classes }) => {
  return (
    <FullLayout>
      <Typography className={classes.display4} type="display4" align="center">404</Typography>
      <Typography className={classes.display3} type="display3" align="center">NOT FOUND</Typography>
    </FullLayout>
  );
};

Error404.propTypes = {
  classes: PropTypes.any
};

export default withStyles(styles)(Error404);

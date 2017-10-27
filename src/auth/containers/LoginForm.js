import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Typography, FormControl, Button, Paper } from 'material-ui';
import TextField from 'forms/TextField';
import { login } from '../redux/actions';

export const LoginForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit(login)}>
      <Paper className="panel">
        <Typography type="display1">Login</Typography>
        <FormControl fullWidth margin="normal">
          <Field name="email" component={TextField} label="Email" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Field name="password" component={TextField} type="password" label="Password" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Button raised type="submit" color="primary">Login</Button>
        </FormControl>
      </Paper>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func
};

const ReduxLoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default ReduxLoginForm;

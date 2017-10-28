import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Typography, FormControl, Button, Paper } from 'material-ui';
import TextField from 'forms/TextField';
import { login } from '../redux/actions';

export const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit(login)}>
      <Paper className="panel">
        <Typography type="display1">Login</Typography>
        <FormControl fullWidth margin="normal">
          <Field name="email" component={TextField} label="Email" error={!!error} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Field name="password" component={TextField} type="password" error={!!error} label="Hasło" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Button raised type="submit" color="primary">Zaloguj</Button>
        </FormControl>
      </Paper>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string
};

const ReduxLoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default ReduxLoginForm;

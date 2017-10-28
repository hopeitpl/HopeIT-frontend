import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Typography, FormControl, Button, Grid } from 'material-ui';
import { CheckCircle } from 'material-ui-icons';
import { indigo } from 'material-ui/colors';
import ImageField from 'forms/ImageField';
import TextField from 'forms/TextField';
import { sendMessage } from '../redux';

export class SendMessageForm extends React.Component {
  render() {
    const { handleSubmit, user, submitSucceeded, submitting, reset } = this.props;

    return (
      <form onSubmit={handleSubmit(sendMessage({urlParams: {id: user.id}}))}>
        <Typography type="display3" align="center" gutterBottom>Wyślij wiadomość do {user.username}</Typography>
        {submitSucceeded ?
          <Grid container direction="column" alignItems="center" justify="center">
            <Grid item>
              <CheckCircle style={{width: '150px', height: '150px', fill: indigo[500]}} />
            </Grid>
            <Grid item>
              <Typography type="headline" align="center" color="primary">
                Wysłano wiadomość do użytkownika {user.username}
              </Typography>
            </Grid>
            <Grid item>
              <Button raised color="primary" onClick={() => reset()}>
                Wyślij kolejną wiadomość!
              </Button>
            </Grid>
          </Grid>
          :
          <div style={{maxWidth: '400px', margin: '0 auto'}}>
            <FormControl fullWidth margin="normal">
              <Field name="body" component={TextField} multiline label="Treść wiadomości" />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Field name="picture" component={ImageField} label="Obraz" />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Button raised disabled={submitting} type="submit" color="primary">Wyślij</Button>
            </FormControl>
          </div>
        }
      </form>
    );
  }
}

SendMessageForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool,
  submitting: PropTypes.bool,
  user: PropTypes.object,
  reset: PropTypes.func
};

const ReduxSendMessageForm = reduxForm({
  form: 'sendMessage'
})(SendMessageForm);

export default ReduxSendMessageForm;

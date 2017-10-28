import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Typography, FormControl, Button, Grid } from 'material-ui';
import { CheckCircle } from 'material-ui-icons';
import { indigo } from 'material-ui/colors';
import ImageField from 'forms/ImageField';
import TextField from 'forms/TextField';
import Autocomplete from 'forms/Autocomplete';
import { sendMultiMessage } from '../redux';

export class SendMultiMessageForm extends React.Component {
  render() {
    const { handleSubmit, submitSucceeded, submitting, reset } = this.props;

    return (
      <form onSubmit={handleSubmit(sendMultiMessage())}>
        <Typography type="display3" align="center" gutterBottom>Wyślij wiadomość do wielu użytkowników</Typography>
        {submitSucceeded ?
          <Grid container direction="column" alignItems="center" justify="center">
            <Grid item>
              <CheckCircle style={{width: '150px', height: '150px', fill: indigo[500]}} />
            </Grid>
            <Grid item>
              <Typography type="headline" align="center" color="primary">
                Wiadomość została pomyślnie wysłana do użytkowników
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
              <Field name="user_ids" component={Autocomplete} label="Użytkownicy" />
            </FormControl>
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

SendMultiMessageForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func
};

const ReduxSendMultiMessageForm = reduxForm({
  form: 'sendMultiMessage'
})(SendMultiMessageForm);

export default ReduxSendMultiMessageForm;

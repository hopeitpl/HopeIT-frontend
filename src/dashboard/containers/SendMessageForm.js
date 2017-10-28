import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Typography, FormControl, Button, Snackbar } from 'material-ui';
import TextField from 'forms/TextField';
import { sendMessage } from '../redux';

export class SendMessageForm extends React.Component {
  state = {
    snackOpen: true
  };

  componentWillReceiveProps(newProps) {
    if (newProps.submitting) {
      this.setState({
        snackOpen: true
      });
    }
  }

  handleSnackClose = () => {
    this.setState({
      snackOpen: false
    });
  }

  render() {
    const { handleSubmit, user, submitSucceeded, submitting } = this.props;
    const { snackOpen } = this.state;

    return (
      <form onSubmit={handleSubmit(sendMessage({urlParams: {id: user.id}}))}>
        <Snackbar
          open={snackOpen && !submitting && submitSucceeded}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={`Wysłano wiadomość do użytkownika ${user.username}`}
          />
        <Typography type="display3" align="center" gutterBottom>Wyślij wiadomość do {user.username}</Typography>
        <div style={{maxWidth: '400px', margin: '0 auto'}}>
          <FormControl fullWidth margin="normal">
            <Field name="body" component={TextField} multiline label="Treść wiadomości" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Field name="picture" component={TextField} label="Obraz" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button raised type="submit" color="primary">Wyślij</Button>
          </FormControl>
        </div>
      </form>
    );
  }
}

SendMessageForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool,
  submitting: PropTypes.bool,
  user: PropTypes.object
};

const ReduxSendMessageForm = reduxForm({
  form: 'sendMessage'
})(SendMessageForm);

export default ReduxSendMessageForm;

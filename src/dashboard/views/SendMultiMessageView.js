import React from 'react';
import PropTypes from 'prop-types';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';
import SendMultiMessageForm from '../containers/SendMultiMessageForm';
import { Paper } from 'material-ui';


export class SendMultiMessageView extends React.Component {
  render () {
    return (
      <AuthenticatedLayout title="Wyślij do wielu">
        <Paper className="panel">
          <SendMultiMessageForm />
        </Paper>
      </AuthenticatedLayout>
    );
  }
}

SendMultiMessageView.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object,
  match: PropTypes.any
};

export default SendMultiMessageView;

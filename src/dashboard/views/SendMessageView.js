import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../redux';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';
import SendMessageForm from '../containers/SendMessageForm';
import { Paper } from 'material-ui';


export class SendMessageView extends React.Component {
  componentWillMount() {
    const { dispatch, match: { params }} = this.props;
    dispatch(fetchUser.request(null, {urlParams: {id: params.id}}));
  }

  componentWillReceiveProps(newProps) {
    const { dispatch, match: { params }} = newProps;
    if(this.props.match.params.id !== params.id) {
      dispatch(fetchUser.request(null, {urlParams: {id: params.id}}));
    }
  }

  render () {
    const { data } = this.props;

    return data ? (
      <AuthenticatedLayout title="Wyślij wiadomość">
        <Paper className="panel">
          <SendMessageForm user={data} />
        </Paper>
      </AuthenticatedLayout>
    ) : null;
  }
}

SendMessageView.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object,
  match: PropTypes.any
};

const select = ({ user }) => (user);

export default connect(select)(SendMessageView);

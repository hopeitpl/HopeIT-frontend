import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../redux';
import { Typography, Paper } from 'material-ui';

export class UserView extends React.Component {
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
      <div>
        <Typography type="display3" gutterBottom>Użytkownik - {data.username}</Typography>
        <Paper>
          Tu będzie coś o userze
        </Paper>
      </div>
    ) : null;
  }
}

UserView.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object,
  match: PropTypes.object
};

export default connect(({ user }) => (user))(UserView);

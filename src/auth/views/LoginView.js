import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FullLayout from 'base/layouts/FullLayout';
import LoginForm from '../containers/LoginForm';

export class LoginView extends React.Component {
  componentWillMount() {
    const { token, dispatch } = this.props;
    token && dispatch(push('/'));
  }
  componentWillReceiveProps(newProps) {
    const { token, dispatch } = newProps;
    token && dispatch(push('/'));
  }

  render() {
    const { token } = this.props;

    return !token ? (
      <FullLayout>
        <LoginForm />
      </FullLayout>
    ) : null;
  }
}

LoginView.propTypes = {
  token: PropTypes.string,
  dispatch: PropTypes.func
};

export default connect(({ login }) => (login))(LoginView);

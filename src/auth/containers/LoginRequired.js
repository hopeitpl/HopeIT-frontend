import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export class LoginRequired extends React.Component {
  componentDidMount() {
    this.handleLoginRequired(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.handleLoginRequired(newProps);
  }

  handleLoginRequired = (props) => {
    const { token, isLoading, dispatch } = props;
    !token && !isLoading && dispatch(push('/login'));
  }

  render () {
    const { children, token } = this.props;

    return (
      <div>
        {token && children}
      </div>
    );
  }
}

LoginRequired.propTypes = {
  dispatch: PropTypes.func,
  token: PropTypes.string,
  children: PropTypes.any,
  isLoading: PropTypes.bool
};

const select = ({ login }) => (login);

export default connect(select)(LoginRequired);

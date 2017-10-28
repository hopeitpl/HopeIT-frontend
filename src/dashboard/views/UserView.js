import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class UserView extends React.Component {
  render () {
    return (
      <div>
        User View {this.props.match.params.id}
      </div>
    );
  }
}

UserView.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object,
  match: PropTypes.object
};

export default connect(({ user }) => (user))(UserView);

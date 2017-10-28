import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from 'dashboard/redux';
import Select from 'react-select';

import 'react-select/dist/react-select.css';


class Autocomplete extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers.request());
  }

  render() {
    const { input, data, disabled } = this.props;

    const options = data && data.users && data.users.map((user) => {
      const name = `(${user.first_name || ''} ${user.last_name || ''})`;
      return {
        label: `${user.username} ${user.first_name || user.last_name ? name : ''}`,
        value: user.id
      };
    });

    return data ? (
      <Select
        name="form-field-name"
        value={input.value}
        multi={true}
        options={options}
        disabled={disabled}
        onChange={(values) => {
          input.onChange(values.map((v) => v.value));
        }}
      />
    ) : null;
  }
}

Autocomplete.propTypes = {
  dispatch: PropTypes.func,
  disabled: PropTypes.bool,
  input: PropTypes.object,
  data: PropTypes.object
};

const select = ({ users }) => (users);

export default connect(select)(Autocomplete);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux';
import { Table, TableHead, TableBody, TableRow, TableCell } from 'material-ui';

export class UsersList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUsers.request());
  }

  render () {
    const { data } = this.props;

    const labels = {
      id: {
        label: 'Id',
        options: {
          numeric: true
        }
      },
      username: {
        label: 'Username'
      },
      device: {
        label: 'Device'
      }
    };

    return data ? (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {Object.values(labels).map((l, i) => {
                return (
                  <TableCell key={i} {...(l.options || {})}>{l.label}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((user, i) => {
              return (
                <TableRow key={i}>
                  {Object.keys(labels).map((key, j) => {
                    return (
                      <TableCell key={j} {...(labels[key].options || {})}>
                        {user[key]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    ) : null;
  }
}

UsersList.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ users }) => (users))(UsersList);

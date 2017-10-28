import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchUsers } from '../redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from 'material-ui';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';

export class UsersList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUsers.request());
  }

  handleUserClick = (id) => {
    return () => {
      this.props.dispatch(push(`/dashboard/users/${id}`));
    };
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
        label: 'Nazwa użytkownika'
      }
    };

    return (
      <AuthenticatedLayout title="Użytkownicy">
        {data ?
          <div>
            <Typography type="display3" gutterBottom>Użytkownicy</Typography>
            <Paper>
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
                      <TableRow key={i} hover onClick={this.handleUserClick(user.id)}>
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
            </Paper>
          </div> : null
        }
      </AuthenticatedLayout>
    );
  }
}

UsersList.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ users }) => (users))(UsersList);

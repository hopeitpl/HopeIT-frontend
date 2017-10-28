import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserMessages, fetchUser } from '../redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from 'material-ui';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';

export class UserMessagesListView extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUserMessages.request(null, {urlParams: {id: this.props.match.params.id}}));
    this.props.dispatch(fetchUser.request(null, {urlParams: {id: this.props.match.params.id}}));
  }

  componentWillReceiveProps(newProps) {
    const { dispatch, match: { params }} = newProps;
    if(this.props.match.params.id !== params.id) {
      dispatch(fetchUserMessages.request(null, {urlParams: {id: params.id}}));
      dispatch(fetchUser.request(null, {urlParams: {id: params.id}}));
    }
  }

  render () {
    const { userMessages, user } = this.props;

    const labels = {
      id: {
        label: 'Id',
        options: {
          numeric: true
        }
      },
      body: {
        label: 'Treść'
      },
      picture: {
        label: 'Obrazek'
      },
      date: {
        label: 'Data wysłania',
        transform: (value) => {
          return new Date(value).toLocaleDateString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      }
    };

    return (
      <AuthenticatedLayout title="Archiwum wiadomości">
        {userMessages.data ?
          <div>
            <Typography type="display2" gutterBottom>Archiwum wiadomości użytkownika {user.data.username}</Typography>
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
                  {userMessages.data.messages.map((user, i) => {
                    return (
                      <TableRow key={i}>
                        {Object.keys(labels).map((key, j) => {
                          return (
                            <TableCell key={j} {...(labels[key].options || {})}>
                              {key === 'picture' ?
                                <img src={`data:image;base64,${user[key]}`} /> :
                                labels[key].transform ? labels[key].transform(user[key]) : user[key]
                              }
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

UserMessagesListView.propTypes = {
  userMessages: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  match: PropTypes.object
};

export default connect(({ userMessages, user }) => ({ user, userMessages }))(UserMessagesListView);

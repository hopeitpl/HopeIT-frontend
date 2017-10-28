import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserMessages } from '../redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from 'material-ui';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';

export class UserMessagesListView extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUserMessages.request(null, {urlParams: {id: this.props.match.params.id}}));
  }

  componentWillReceiveProps(newProps) {
    const { dispatch, match: { params }} = newProps;
    if(this.props.match.params.id !== params.id) {
      dispatch(fetchUserMessages.request(null, {urlParams: {id: params.id}}));
    }
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
      body: {
        label: 'Treść'
      },
      picture: {
        label: 'Obrazek'
      }
    };

    return (
      <AuthenticatedLayout title="Wiadomości do użytkownika">
        {data ?
          <div>
            <Typography type="display3" gutterBottom>Wiadomości do użytkownika</Typography>
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
                  {data.messages.map((user, i) => {
                    return (
                      <TableRow key={i}>
                        {Object.keys(labels).map((key, j) => {
                          return (
                            <TableCell key={j} {...(labels[key].options || {})}>
                              {key === 'picture' ?
                                <img src={user[key]} /> :
                                user[key]
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
  data: PropTypes.object,
  dispatch: PropTypes.func,
  match: PropTypes.object
};

export default connect(({ userMessages }) => (userMessages))(UserMessagesListView);

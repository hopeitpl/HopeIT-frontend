import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMessages } from '../redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper, Grid, Button } from 'material-ui';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';

export class MessagesListView extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchMessages.request());
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
        label: 'Nazwa użytkownika'
      },
      picture: {
        label: 'Obrazek'
      }
    };

    return (
      <AuthenticatedLayout title="Wiadomości">
        {data ?
          <div>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography type="display3" gutterBottom>Wiadomości</Typography>
              </Grid>
              <Grid item>
                <Button raised
                        color="primary"
                        component={Link}
                        to="/dashboard/messages/send">
                    Wyślij do wielu
                </Button>
              </Grid>
            </Grid>
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
                                <img src={`data:image;base64,${user[key]}`} /> :
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

MessagesListView.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ messages }) => (messages))(MessagesListView);

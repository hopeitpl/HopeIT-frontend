import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserPayments } from '../redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from 'material-ui';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';

export class UserPaymentsListView extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUserPayments.request(null, {urlParams: {id: this.props.match.params.id}}));
  }

  componentWillReceiveProps(newProps) {
    const { dispatch, match: { params }} = newProps;
    if(this.props.match.params.id !== params.id) {
      dispatch(fetchUserPayments.request(null, {urlParams: {id: params.id}}));
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
      operation_amount: {
        label: 'Kwota'
      },
      operation_datetime: {
        label: 'Data płatności',
        transform: (value) => {
          return new Date(value).toLocaleDateString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      },
      goal_id: {
        label: 'Cel'
      }
    };

    return data ? (
      <AuthenticatedLayout title="Płatności użytkownika">
        <Typography type="display3" gutterBottom>Płatności użytkownika</Typography>
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
              {data.payments.map((user, i) => {
                return (
                  <TableRow key={i}>
                    {Object.keys(labels).map((key, j) => {
                      return (
                        <TableCell key={j} {...(labels[key].options || {})}>
                          {key === 'operation_amount' ?
                            `${user[key]} ${user.operation_currency}` :
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
      </AuthenticatedLayout>
    ) : null;
  }
}

UserPaymentsListView.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
  match: PropTypes.object
};

export default connect(({ userPayments }) => (userPayments))(UserPaymentsListView);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPayments } from '../redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from 'material-ui';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';

export class PaymentsList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchPayments.request());
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
      user_id: {
        label: 'Id użytkownika'
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

    return (
      <AuthenticatedLayout title="Lista wpłat">
        {data ?
          <div>
            <Typography type="display3" gutterBottom>Lista wpłat</Typography>
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
          </div> : null
        }
      </AuthenticatedLayout>
    );
  }
}

PaymentsList.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ payments }) => (payments))(PaymentsList);

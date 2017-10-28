import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchPayments } from '../redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from 'material-ui';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';

export class PaymentsList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchPayments.request());
  }

  handleUserClick = (id) => {
    return () => {
      this.props.dispatch(push(`/dashboard/payments/${id}`));
    };
  };

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
      },
      amount: {
        label: 'Kwota'
      },
    };

    return data ? (
      <AuthenticatedLayout title="Lista płatności">
        <Typography type="display3" gutterBottom>Lista płatności</Typography>
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
      </AuthenticatedLayout>
    ) : null;
  }
}

PaymentsList.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ payments }) => (payments))(PaymentsList);

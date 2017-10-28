import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../redux';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import { Typography, Paper, Grid, Button } from 'material-ui';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';


export class UserView extends React.Component {
  componentWillMount() {
    const { dispatch, match: { params }} = this.props;
    dispatch(fetchUser.request(null, {urlParams: {id: params.id}}));
  }

  componentWillReceiveProps(newProps) {
    const { dispatch, match: { params }} = newProps;
    if(this.props.match.params.id !== params.id) {
      dispatch(fetchUser.request(null, {urlParams: {id: params.id}}));
    }
  }

  render () {
    const { data } = this.props;

    return (
      <AuthenticatedLayout title="Użytkownik">
        {data ?
          <Paper className="panel user-panel">
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Typography type="display3" gutterBottom>{data.first_name} {data.last_name}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item sm={8}>
                <Grid container alignItems="center" style={{marginTop: '20px'}}>
                  <Grid container className="user-field">
                    <Grid item sm={6}>
                      <Typography type="headline" gutterBottom>Nazwa użytkownika</Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Typography color="primary" type="headline" gutterBottom>{data.username}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className="user-field">
                    <Grid item sm={6}>
                      <Typography type="headline" gutterBottom>Ukończone cele</Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Typography color="primary" type="headline" gutterBottom>{data.finished_goals}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className="user-field">
                    <Grid item sm={6}>
                      <Typography type="headline" gutterBottom>Suma wpłat</Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Typography color="primary" type="headline" gutterBottom>{data.total_amount}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className="user-field">
                    <Grid item sm={6}>
                      <Typography type="headline" gutterBottom>Liczba przelewów</Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Typography color="primary" type="headline" gutterBottom>{data.total_payments}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={4}>
                <Grid container alignItems="center" justify="center">
                  <Grid item>
                    <AccountCircleIcon style={{width: '250px', height: '250px', fill: 'rgba(0, 0, 0, 0.54)'}}/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="center" style={{marginTop: '40px'}}>
              <Grid item>
                <Button component={Link}
                        to={`/dashboard/users/${data.id}/send`}
                        raised
                        color="primary">
                  Wyślij wiadomość
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link}
                        to={`/dashboard/users/${data.id}/messages`}
                        raised
                        color="primary">
                  Archiwum wiadomości
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link}
                        to={`/dashboard/users/${data.id}/payments`}
                        raised
                        color="primary">
                  Lista wpłat
                </Button>
              </Grid>
            </Grid>
          </Paper> : null
        }
      </AuthenticatedLayout>
    );
  }
}

UserView.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object,
  match: PropTypes.object
};

export default connect(({ user }) => (user))(UserView);

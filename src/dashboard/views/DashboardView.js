import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';
import { Link } from 'react-router-dom';
import { Card, Grid, CardContent, Typography, Button } from 'material-ui';
import { pink, indigo } from 'material-ui/colors';
import { fetchDashboard } from '../redux';


class DashboardView extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchDashboard.request());
  }

  render() {
    const { data } = this.props;

    return <AuthenticatedLayout title="Pulpit">
      <Grid container>
        <Grid item xs={12} md={8}>
          <div style={{textAligg: 'right'}}>
            <Card>
              <CardContent>
                <Typography component="h3">
                  Zebrane środki
                </Typography>
                <Typography type="headline" component="h1">
                  {data && data.total_balance} zł
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography component="h3">
                  Ilość wpłat
                </Typography>
                <Typography type="headline" component="h1">
                  {data && data.total_payments}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography component="h3">
                  Zarejestrowani użytkownicy
                </Typography>
                <Typography type="headline" component="h1">
                  {data && data.total_users}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography component="h3">
                  Wspólny cel (suma)
                </Typography>
                <Typography type="headline" component="h1">
                  {data && data.total_goal} zł
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container direction="column"
                className="dashboard-buttons"
                alignItems="center"
                justify="center" style={{margin: '0'}}>
            <Grid item>
              <Button to={'/dashboard/users'} component={Link}
                      raised color="primary" style={{width: '270px'}}>
                Użytkownicy
              </Button>
            </Grid>
            <Grid item>
              <Button to={'/dashboard/payments'} component={Link}
                      raised style={{width: '270px', background: pink[500], color: 'white'}}>
                Lista wpłat
              </Button>
            </Grid>
            <Grid item>
              <Button to={'/dashboard/messages'} component={Link}
                      raised style={{width: '270px', background: indigo[200], color: 'white'}}>
                Wiadomości
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </AuthenticatedLayout>;
  }
}

DashboardView.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ dashboard }) => (dashboard))(DashboardView);

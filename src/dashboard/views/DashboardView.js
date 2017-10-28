import React from 'react';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';
import { Link } from 'react-router-dom';
import { Card, Grid, CardContent, Typography, Button } from 'material-ui';
import { pink, indigo } from 'material-ui/colors';


class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch(__API_URL__ + '/admin/dashboard').then(result => result.json()).then(json => this.setState(json));
  }

  render() {
    return <AuthenticatedLayout title="Pulpit">
      <Grid container>
        <Grid item xs={12} md={10}>
          <div style={{textAligg: 'right'}}>
            <Card>
              <CardContent>
                <Typography component="h3">
                  Zebrane środki
                </Typography>
                <Typography type="headline" component="h1">
                  {this.state.total_balance} zł
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography component="h3">
                  Ilość wpłat
                </Typography>
                <Typography type="headline" component="h1">
                  {this.state.total_payments}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography component="h3">
                  Zarejestrowani użytkownicy
                </Typography>
                <Typography type="headline" component="h1">
                  {this.state.total_users}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography component="h3">
                  Wspólny cel (suma)
                </Typography>
                <Typography type="headline" component="h1">
                  {this.state.total_goal} zł
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
        <Grid item xs={12} md={2}>
          <Grid container direction="column"
                className="dashboard-buttons"
                alignItems="center"
                justify="center" style={{margin: '0'}}>
            <Grid item>
              <Button to={'/dashboard/users'} component={Link} raised color="primary" style={{width: '150px'}}>
                Użytkownicy
              </Button>
            </Grid>
            <Grid item>
              <Button to={'/dashboard/payments'} component={Link}
                      raised style={{width: '150px', background: pink[500], color: 'white'}}>
                Lista wpłat
              </Button>
            </Grid>
            <Grid item>
              <Button to={'/dashboard/messages'} component={Link}
                      raised style={{width: '150px', background: indigo[200], color: 'white'}}>
                Wiadomości
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </AuthenticatedLayout>;
  }
}

export default DashboardView;

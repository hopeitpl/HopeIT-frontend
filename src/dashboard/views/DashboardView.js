import React from 'react';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';
import { Card, CardContent, Typography } from 'material-ui';


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
      <div>
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
    </AuthenticatedLayout>;
  }
}

export default DashboardView;

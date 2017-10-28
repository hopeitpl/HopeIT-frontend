import React from 'react';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';
import Card from "material-ui/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";
import Typography from "material-ui/es/Typography/Typography";

// export const DashboardView = () => {
//   return (
//     <AuthenticatedLayout title="Pulpit">
//       Dashboard
//     </AuthenticatedLayout>
//   );
// };


class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch(__API_URL__ + '/admin/dashboard').then(result => result.json()).then(json => this.setState(json));
  }

  render() {
    console.log(this.state);
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
    </AuthenticatedLayout>
  }
}

export default DashboardView;

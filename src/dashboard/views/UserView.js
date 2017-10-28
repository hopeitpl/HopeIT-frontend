import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../redux';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import { Typography, Paper, Grid, Button } from 'material-ui';
import { grey } from 'material-ui/colors';
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
          <Paper className="panel">
            <Typography type="display3" gutterBottom style={{paddingLeft: '16px'}}>{data.username}</Typography>
            <Grid container alignItems="center">
              <Grid item>
                <AccountCircleIcon style={{width: '150px', height: '150px', fill: grey[500] }}/>
              </Grid>
              <Grid item>
                <Typography type="display2" gutterBottom>{data.first_name} {data.last_name}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="flex-end">
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import LoginRequired from 'auth/containers/LoginRequired';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, withStyles } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import { logout } from 'auth/redux/actions';
import UsersList from '../containers/UsersList';


const styles = () => ({
  flex: {
    flex: 1
  },
  hide: {
    display: 'none'
  },
  list: {
    width: 250
  },
  main: {
    paddingTop: '80px'
  }
});

export class DashboardView extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { dispatch, classes } = this.props;
    const { open } = this.state;

    return (
      <LoginRequired>
        <AppBar>
          <Toolbar disableGutters={!open}>
            <IconButton color="contrast"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        className={cx(open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Dashboard
            </Typography>
            <Button color="contrast" onClick={() => dispatch(logout())}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          open={open}
          onRequestClose={this.handleDrawerClose}>
          <div className={classes.list}>
            <List></List>
          </div>
        </Drawer>
        <main className={classes.main}>
          <UsersList />
        </main>
      </LoginRequired>
    );
  }
}

DashboardView.propTypes = {
  dispatch: PropTypes.func,
  classes: PropTypes.any
};

export default connect()(withStyles(styles)(DashboardView));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import LoginRequired from 'auth/containers/LoginRequired';
import Navbar from 'dashboard/components/Navbar';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, Divider, withStyles } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import { logout } from 'auth/redux/actions';


const styles = (theme) => ({
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
    paddingTop: '80px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '16px'
  }
});

export class AuthenticatedLayout extends React.Component {
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
    const { dispatch, classes, children, title } = this.props;
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
              {title}
            </Typography>
            <Button color="contrast" onClick={() => dispatch(logout())}>Wyloguj</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          open={open}
          onRequestClose={this.handleDrawerClose}>
          <div className={classes.list}
               tabIndex={0}
               role="button"
               onClick={this.handleDrawerClose}
               onKeyDown={this.handleDrawerClose}>
            <div className={classes.drawerHeader}>
              <Typography type="title" className={classes.flex}>Menu</Typography>
            </div>
            <Divider />
            <Navbar />
          </div>
        </Drawer>
        <main className={classes.main}>
          {children}
        </main>
      </LoginRequired>
    );
  }
}

AuthenticatedLayout.propTypes = {
  dispatch: PropTypes.func,
  classes: PropTypes.any,
  children: PropTypes.any,
  title: PropTypes.string
};

export default connect()(withStyles(styles)(AuthenticatedLayout));

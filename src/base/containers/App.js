import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginView from 'auth/views/LoginView';
import DashboardView from 'dashboard/views/DashboardView';
import Error404 from 'base/views/Error404';
import { MuiThemeProvider, createMuiTheme, red, indigo } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: red
  }
});

export const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/login" component={LoginView} />
        <Route exact path="/" component={DashboardView} />
        <Route component={Error404} />
      </Switch>
    </MuiThemeProvider>
  );
};

App.propTypes = {

};

export default App;

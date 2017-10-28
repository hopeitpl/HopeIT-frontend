import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginView from 'auth/views/LoginView';
import DashboardView from 'dashboard/views/DashboardView';
import RouteNotFound from 'httpErrors/components/RouteNotFound';
import HandleError from 'httpErrors/containers/HandleError';
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
      <HandleError>
        <Switch>
          <Route exact path="/login" component={LoginView} />
          <Route path="/dashboard" component={DashboardView} />
          <Redirect exact from="/" to="/dashboard" />
          <RouteNotFound />
        </Switch>
      </HandleError>
    </MuiThemeProvider>
  );
};

App.propTypes = {

};

export default App;

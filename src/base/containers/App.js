import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, red, indigo } from 'material-ui/styles';
import LoginView from 'auth/views/LoginView';
import DashboardView from 'dashboard/views/DashboardView';
import UsersList from 'dashboard/views/UsersListView';
import UserView from 'dashboard/views/UserView';
import SendMessageView from 'dashboard/views/SendMessageView';
import SendMultiMessageView from 'dashboard/views/SendMultiMessageView';
import RouteNotFound from 'httpErrors/components/RouteNotFound';
import HandleError from 'httpErrors/containers/HandleError';
import PaymentsListView from 'dashboard/views/PaymentsListView';
import MessagesListView from 'dashboard/views/MessagesListView';
import UserPaymentsListView from 'dashboard/views/UserPaymentsListView';
import UserMessagesListView from 'dashboard/views/UserMessagesListView';

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
          <Route path="/dashboard">
            <Switch>
              <Route exact path="/dashboard/users/:id/payments" component={UserPaymentsListView} />
              <Route exact path="/dashboard/users/:id/messages" component={UserMessagesListView} />
              <Route exact path="/dashboard/users/:id/send" component={SendMessageView} />
              <Route exact path="/dashboard/users/:id" component={UserView} />
              <Route exact path="/dashboard/users" component={UsersList} />
              <Route exact path="/dashboard/payments" component={PaymentsListView} />
              <Route exact path="/dashboard/messages/send" component={SendMultiMessageView} />
              <Route exact path="/dashboard/messages" component={MessagesListView} />
              <Route exact path="/dashboard" component={DashboardView} />
              <RouteNotFound />
            </Switch>
          </Route>
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

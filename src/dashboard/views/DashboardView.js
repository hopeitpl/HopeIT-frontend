import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersList from '../containers/UsersList';
import UserView from './UserView';
import RouteNotFound from 'httpErrors/components/RouteNotFound';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';

export const DashboardView = () => {
  return (
    <AuthenticatedLayout title="Pulpit">
      <Switch>
        <Route exact path="/dashboard/users/:id" component={UserView} />
        <Route exact path="/dashboard/users" component={UsersList} />
        <Route exact path="/dashboard" component={UsersList} />
        <RouteNotFound />
      </Switch>
    </AuthenticatedLayout>
  );
};

export default DashboardView;

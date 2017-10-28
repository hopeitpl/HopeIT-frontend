import React from 'react';
import AuthenticatedLayout from 'auth/layouts/AuthenticatedLayout';

export const DashboardView = () => {
  return (
    <AuthenticatedLayout title="Pulpit">
      Dashboard
    </AuthenticatedLayout>
  );
};

export default DashboardView;

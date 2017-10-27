import React from 'react';
import FullLayout from 'base/layouts/FullLayout';
import LoginForm from '../containers/LoginForm';

export const LoginView = () => {
  return (
    <FullLayout>
      <LoginForm />
    </FullLayout>
  );
};

export default LoginView;

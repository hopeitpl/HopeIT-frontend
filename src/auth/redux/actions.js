import { createFormAction } from 'redux-form-saga';

export const login = createFormAction('LOGIN');

export const LOGOUT = 'LOGOUT';

export const logout = () => {
  return {
    type: LOGOUT
  };
};

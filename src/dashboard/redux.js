import { createAction, createSaga, createReducer } from 'base/redux/utils';

export const fetchUsers = createAction('FETCH_USERS');
export const usersSaga = createSaga(fetchUsers, '/admin/users');
export const usersReducer = createReducer(fetchUsers);

export const fetchUser = createAction('FETCH_USER');
export const userSaga = createSaga(fetchUser, '/admin/users');
export const userReducer = createReducer(fetchUser);

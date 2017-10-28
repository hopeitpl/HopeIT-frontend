import { createAction, createSaga, createReducer } from 'base/redux/utils';

export const fetchUsers = createAction('FETCH_USERS');
export const usersSaga = createSaga(fetchUsers, '/admin/users');
export const usersReducer = createReducer(fetchUsers);

import { createAction, createSaga, createReducer } from 'base/redux/utils';

export const fetchUsers = createAction('FETCH_USERS', {url: '/admin/users'});
export const usersSaga = createSaga(fetchUsers);
export const usersReducer = createReducer(fetchUsers);

export const fetchUser = createAction('FETCH_USER', {url: '/admin/users/:id'});
export const userSaga = createSaga(fetchUser);
export const userReducer = createReducer(fetchUser);

export const sendMessage = createAction('SEND_MESSAGE', {
  method: 'POST',
  url: '/admin/messages/user/:id'
});
export const sendMessageReducer = createReducer(sendMessage);
export const sendMessageSaga = createSaga(sendMessage);

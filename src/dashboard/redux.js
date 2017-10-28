import { createAction, createSaga, createReducer } from 'base/redux/utils';

export const fetchUsers = createAction('FETCH_USERS', {url: '/admin/users'});
export const usersSaga = createSaga(fetchUsers);
export const usersReducer = createReducer(fetchUsers);

export const fetchPayments = createAction('FETCH_PAYMENTS', {url: '/admin/payments'});
export const paymentsSaga = createSaga(fetchPayments);
export const paymentsReducer = createReducer(fetchPayments);

export const fetchUserPayments = createAction('FETCH_USER_PAYMENTS', {url: '/admin/payments/user/:id'});
export const userPaymentsSaga = createSaga(fetchUserPayments);
export const userPaymentsReducer = createReducer(fetchUserPayments);

export const fetchUserMessages = createAction('FETCH_USER_MESSAGES', {url: '/admin/messages/user/:id'});
export const userMessagesSaga = createSaga(fetchUserMessages);
export const userMessagesReducer = createReducer(fetchUserMessages);

export const fetchMessages = createAction('FETCH_MESSAGES', {url: '/admin/messages'});
export const messagesSaga = createSaga(fetchMessages);
export const messagesReducer = createReducer(fetchMessages);

export const fetchUser = createAction('FETCH_USER', {url: '/admin/users/:id'});
export const userSaga = createSaga(fetchUser);
export const userReducer = createReducer(fetchUser);

export const sendMessage = createAction('SEND_MESSAGE', {
  method: 'POST',
  url: '/admin/messages/user/:id'
});
export const sendMessageReducer = createReducer(sendMessage);
export const sendMessageSaga = createSaga(sendMessage);

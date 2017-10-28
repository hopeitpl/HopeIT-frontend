import { takeEvery, put, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import Api from 'api';
import { login, LOGOUT } from './actions';

export function* loginSaga() {
  yield takeEvery(login.REQUEST, handleLoginSaga);
}

export function* logoutSaga() {
  yield takeEvery(LOGOUT, handleLogoutSaga);
}

function* handleLoginSaga(action) {
  const { username, password, redirect = true } = action.payload;
  let token;

  try {
    if (action.payload.token) {
      token = action.payload.token;
    } else {
      token = btoa(`${username}:${password}`);
      yield call(Api.setCookie, 'token', token, {path: '/'});
    }
    yield call(Api.get, '/_ping');
    yield put(login.success({ token }));
    if (redirect) {
      yield put(push('/dashboard'));
    }
  } catch(error) {
    console.log(error);
    const formError = new SubmissionError({
      _error: 'Login error'
    });

    yield put(login.failure(formError));
    yield call(Api.removeCookie, 'token', {path: '/'});
  }
}

function* handleLogoutSaga() {
  yield call(Api.removeCookie, 'token', {path: '/'});
}

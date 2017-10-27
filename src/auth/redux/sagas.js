import { takeEvery, put, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import Api from 'api';
import { login } from './actions';

export function* loginSaga() {
  yield takeEvery(login.REQUEST, handleLoginSaga);
}

function* handleLoginSaga(action) {
  const { email, password } = action.payload;

  try {
    const token = btoa(`${email}:${password}`);
    yield call(Api.setCookie, 'token', token, {path: '/'});
    yield call(Api.get, '/_ping');
    yield put(login.success({ token }));
  } catch(error) {
    console.log(error);
    const formError = new SubmissionError({
      _error: 'Login error'
    });

    yield put(login.failure(formError));
    yield call(Api.removeCookie, 'token', {path: '/'});
  }
}

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import formActionSaga from 'redux-form-saga';
import { reducer as formReducer } from 'redux-form';
import Api from 'api';
import { all, call, put } from 'redux-saga/effects';
import { login } from 'auth/redux/actions';

// Sagas
import { loginSaga, logoutSaga } from 'auth/redux/sagas';

// Reducers
import loginReducer from 'auth/redux/reducers';
import {
  usersReducer, usersSaga,
  userReducer, userSaga,
  sendMessageReducer, sendMessageSaga,
  paymentsReducer, paymentsSaga,
  messagesReducer, messagesSaga,
  userPaymentsReducer, userPaymentsSaga,
  userMessagesReducer, userMessagesSaga,
  sendMultiMessageReducer, sendMultiMessageSaga
} from 'dashboard/redux';
import { httpErrorsReducer } from 'httpErrors/redux';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = !__PRODUCTION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function* initialSaga() {
  const token = yield call(Api.getCookie, 'token');
  if (token) {
    yield put(login.request({ token, redirect: false }));
  } else {
    yield put(login.failure());
  }
}

const rootSaga = function* () {
  yield all([
    formActionSaga(),
    loginSaga(),
    logoutSaga(),
    usersSaga(),
    userSaga(),
    sendMessageSaga(),
    paymentsSaga(),
    messagesSaga(),
    userPaymentsSaga(),
    userMessagesSaga(),
    sendMultiMessageSaga(),
    initialSaga()
  ]);
};

const rootReducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  login: loginReducer,
  form: formReducer,
  payments: paymentsReducer,
  userPayments: userPaymentsReducer,
  userMessages: userMessagesReducer,
  httpErrors: httpErrorsReducer,
  sendMessage: sendMessageReducer,
  sendMultiMessage: sendMultiMessageReducer,
  messages: messagesReducer,
  router: routerReducer
});

export default (history, initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddleware(history))
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

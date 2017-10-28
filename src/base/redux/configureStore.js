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
import { usersReducer, usersSaga } from 'dashboard/redux';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = !__PRODUCTION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function* initialSaga() {
  const token = yield call(Api.getCookie, 'token');
  if (token) {
    yield put(login.request({ token }));
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
    initialSaga()
  ]);
};

const rootReducer = combineReducers({
  users: usersReducer,
  login: loginReducer,
  form: formReducer,
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

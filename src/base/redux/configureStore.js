import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import formActionSaga from 'redux-form-saga';
import { reducer as formReducer } from 'redux-form';
import { all } from 'redux-saga/effects';

// Sagas
import { loginSaga } from 'auth/redux/sagas';

// Reducers
import login from 'auth/redux/reducers';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = !__PRODUCTION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootSaga = function* () {
  yield all([
    formActionSaga(),
    loginSaga(),
  ]);
};

const rootReducer = combineReducers({
  login,
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

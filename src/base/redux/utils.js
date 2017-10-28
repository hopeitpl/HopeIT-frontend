import { call, put, takeEvery } from 'redux-saga/effects';
import ParserRoute from 'route-parser';
import Api from 'api';
import { PROMISE } from 'redux-form-saga';

const status = ['REQUEST', 'SUCCESS', 'FAILURE'];

export const createAction = (type, config = {}) => {
  const defaultConfig = {
    method: 'GET'
  };

  const action = status.reduce((prev, s) => {
    let res = {};
    let a = `${type}_${s}`;
    let subAction = (payload, options = {}) => ({
      type: a,
      payload,
      options
    });

    res[s] = a;
    res[s.toLowerCase()] = subAction;

    return {...prev, ...res};
  }, {});

  action.config = {...defaultConfig, ...config};

  const formAction = (payload) => ({
    type: PROMISE,
    payload
  });

  return Object.assign((options) => (data, dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(formAction({
        request: action.request(data, options),
        defer: { resolve, reject },
        types: [action.SUCCESS, action.FAILURE]
      }));
    });
  }, action);
};

export const createSaga = (action, options) => {
  function* apiSaga(a) {
    try {
      const url = new ParserRoute(action.config.url);
      const response = yield call(
        Api[action.config.method.toLowerCase()], url.reverse(a.options && a.options.urlParams), a.payload, options
      );
      yield put(action.success({ data: response.data }));
    } catch (error) {
      yield put(action.failure({ error: error.toString() }));
    }
  }

  return function* () {
    yield takeEvery(action.REQUEST, apiSaga);
  };
};

export const createReducer = (action) => {
  const initialState = {
    data: null,
    error: null,
    isLoading: false
  };

  const defaultReducers = {
    [action.REQUEST]: () => {
      return {
        ...initialState,
        isLoading: true
      };
    },
    [action.FAILURE]: (state, a) => {
      return {
        ...initialState,
        error: a.payload.error,
      };
    },
    [action.SUCCESS]: (state, a) => {
      return {
        ...initialState,
        data: a.payload.data,
        isLoading: false
      };
    }
  };

  return (state = initialState, a) => {
    return defaultReducers[a.type] ? defaultReducers[a.type](state, a) : state;
  };
};

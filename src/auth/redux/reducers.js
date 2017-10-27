import { login, LOGOUT } from './actions';

const initialState = {
  token: null,
  error: null,
  isLoading: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case login.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case login.SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
        error: null
      };
    case login.FAILURE: {
      let error = action.payload;

      return {
        ...state,
        token: null,
        isLoading: false,
        error
      };
    }
    case LOGOUT:
      return {
        ...state,
        token: null,
        isLoading: false,
        error: null
      };
  }

  return state;
};

export default loginReducer;

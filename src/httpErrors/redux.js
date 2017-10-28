import { LOCATION_CHANGE } from 'react-router-redux';

export const HTTP_ERROR = 'HTTP_ERROR';
export const httpError = (error) => {
  return {
    type: HTTP_ERROR,
    error
  };
};

const initialState = {
  error: null
};

export const httpErrorsReducer = (state = initialState, action) => {
  switch(action.type) {
    case HTTP_ERROR:
      return {
        error: action.error
      };
    case LOCATION_CHANGE:
      return initialState;
  }

  return state;
};

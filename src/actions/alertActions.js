import * as types from './types';

export const success = (message) => {
  return { 
    type: types.ALERT_SUCCESS,
    message: message
  }
};

export const error = (message) => (
  { 
    type: types.ALERT_ERROR,
    message: message
  }
);

export const clear = () => (
  { 
    type: types.ALERT_CLEAR
  }
);
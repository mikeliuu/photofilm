import * as types from '../actions/types';

const initialState = {
  message: null
};

const alert = (state = initialState, action) => {
  switch(action.type) {
    case types.ALERT_SUCCESS:
      return {
        message: action.message
      };
    case types.ALERT_ERROR:
      return {
        message: action.message
      };
    case types.ALERT_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default alert;
import * as types from '../actions/types';

const initialState = {
  loading: false
};

const auth = (state = initialState, action) => {
  switch(action.type) {
    //signup
    case types.SIGNUP_REQUEST:
      return {
        loading: true
      };
    case types.SIGNUP_SUCCESS:
      return {
        loading: false
      };
    case types.SIGNUP_FAILURE:
    //login
    case types.LOGIN_REQUEST:
    return {
      loading: true
    };
  case types.LOGIN_SUCCESS:
    return {
      loading: false
    };
  case types.LOGIN_FAILURE:
    default:
      return state;
  }
};

export default auth;
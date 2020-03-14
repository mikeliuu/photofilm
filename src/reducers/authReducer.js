import * as types from '../actions/types';

const initialState = {
  loading: false
};

const auth = (state = initialState, action) => {
  switch(action.type) {
    case types.SIGNUP_REQUEST:
      return {
        loading: true
      };
    case types.SIGNUP_SUCCESS:
      return {
        loading: false
      };
    case types.SIGNUP_FAILURE:
    default:
      return state;
  }
};

export default auth;
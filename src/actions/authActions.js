import axios from 'axios';
import config from '../config.json';
import * as types from './types';
import * as alert from './alertActions';

const signupRequest = () => (
  { type: types.SIGNUP_REQUEST }
);
const signupSuccess = (message) => (
  { 
    type: types.SIGNUP_SUCCESS,
    message: message
  }
);
const signupFailure = (message) => (
  { 
    type: types.SIGNUP_FAILURE,
    message: message
  }
);

export const signupUser = (user) => {
  return async (dispatch, getState) => {
    dispatch(signupRequest());

    return await axios.post(`${config.API_HOST}/api/auth/signup`, user)
    .then(res => {
      dispatch(signupSuccess());
      dispatch(alert.success(res.data));
    })
    .catch(err => {
      dispatch(signupFailure());
      dispatch(alert.error(err));
    });
  };
};


//login func
// const loginSuccess = () => (
//   { type: types.SIGNUP_SUCCESS }
// );
// const loginFailure = (message) => (
//   { 
//     type: types.SIGNUP_FAILURE,
//     message: message
//   }
// );
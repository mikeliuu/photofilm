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
      dispatch(signupFailure()); //replace with alert
      dispatch(alert.error(err));
    });
  };
};


// login func
const loginRequest = () => (
  { type: types.LOGIN_REQUEST }
);
const loginSuccess = () => (
  { type: types.LOGIN_SUCCESS }
);
const loginFailure = (message) => (
  { 
    type: types.LOGIN_FAILURE,
    message: message
  }
);

export const loginUser = (user) => {
  return async (dispatch, getState) => {
    dispatch(loginRequest());

    return await axios.post(`${config.API_HOST}/api/auth/login`, user)
    .then(res => {
      dispatch(loginSuccess());
    })
    .catch(err => {
      dispatch(loginFailure()); //replace with alert
      dispatch(alert.error(err));
    })
  }
}
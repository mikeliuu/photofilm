import axios from 'axios';
import * as types from './types';
import config from '../config.json';

export const fetchIgPosts = (tag) => {
  return async (dispatch, getState) => {
    const res = await axios.get(`${config.API_HOST}/api/posts/${tag}`);

    dispatch({
      type: types.FETCH_IG_POSTS,
      payload: res.data
    })
  };
};
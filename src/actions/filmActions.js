import axios from 'axios';
import * as types from './types';
import config from '../config.json';

export const fetchFilms = () => { 
  return async (dispatch, getState) => {
    const res = await axios.get(`${config.API_HOST}/api/films`);
    
    dispatch({
      type: types.FETCH_FILMS,
      payload: res.data
    })
  };
};

export const addFilmSaved = (id, saved) => {  
  saved += 1
  
  axios.put(`${config.API_HOST}/api/films/${id}`, { saved })
  .catch(err => {
    console.log(err);
  });

  return {
    type: types.ADD_FILM_SAVED,
    payload: {id, saved}
  }
};

export const subFilmSaved = (id, saved) => {
  saved -= 1
  
  axios.put(`${config.API_HOST}/api/films/${id}`, { saved })
  .catch(err => {
    console.log(err);
  });

  return {
    type: types.SUB_FILM_SAVED,
    payload: {id, saved}
  }
};

export const addFilmViewed = (id, viewed) => {
  viewed += 1

  axios.put(`${config.API_HOST}/api/films/${id}`, { viewed })
  .catch(err => {
    console.log(err);
  });

  return {
    type: types.ADD_FILM_VIEWED,
    payload: {id, viewed}
  }
};

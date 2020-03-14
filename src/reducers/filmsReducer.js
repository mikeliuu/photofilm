import * as types from '../actions/types';

const initialState = {
  items: [],
};

const films = (state = initialState, action) => {
  const { payload } = action;

  switch(action.type) {
    case types.FETCH_FILMS:
      return {
        ...state,
        items: payload
      };
    case types.ADD_FILM_SAVED:
    case types.SUB_FILM_SAVED:
      return {
        ...state,
        items: state.items.map(item => item._id === payload.id ? { ...item, saved: payload.saved } : item)
      };
    case types.ADD_FILM_VIEWED:
      return {
        ...state,
        items: state.items.map(item => item._id === payload.id ? { ...item, viewed: payload.viewed } : item)
      };
    default:
      return state;
  };
};

export default films;

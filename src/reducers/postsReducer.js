import * as types from '../actions/types';

const initialState = {
  items: []
};

const posts = (state = initialState, action) => {
  const { payload } = action;

  switch(action.type) {
    case types.FETCH_IG_POSTS:
      return {
        ...state,
        items: payload
      }
    default:
      return state;
  };
};

export default posts;

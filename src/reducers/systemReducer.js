import * as types from '../actions/types';

const initialState = {
  width: {
    isTablet: false
  }
};

const system = (state = initialState, action) => {
  switch(action.type) {
    case types.UPDATE_TABLET_WIDTH:
      return {
        ...state,
        width: {
          isTablet: action.bool
        }
      };
    default:
      return state;
  }
};

export default system;
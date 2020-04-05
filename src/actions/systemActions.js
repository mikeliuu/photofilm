import * as types from './types';

//tablet width
export const updateTabletWidth = (val) => {
  return {
    type: types.UPDATE_TABLET_WIDTH,
    bool: val
  }
};
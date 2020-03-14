import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import films from './filmsReducer';
import posts from './postsReducer';
import auth from './authReducer';
import alert from './alertReducer';

const rootPersistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  films,
  posts,
  auth,
  alert
});

export default persistReducer(rootPersistConfig, rootReducer);
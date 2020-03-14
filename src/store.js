import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import config from './config.json';
import rootReducer from './reducers/rootReducer';

import dotenv from 'dotenv';
dotenv.config();

//chrome browser only
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let enhancer;

config.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : config.NODE_ENV;

switch (config.NODE_ENV) {
  case 'development':
    enhancer = compose(applyMiddleware(thunk), devTools);
    break;
  case 'production':
  default:
    enhancer = compose(applyMiddleware(thunk));
};

export const store = createStore(rootReducer, enhancer);
export const persistor = persistStore(store);

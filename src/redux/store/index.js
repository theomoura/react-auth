import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';

const logger = createLogger({
  level: 'info',
  collapsed: false,
  logger: console,
  predicate: () => true, // eslint-disable-line
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'],
};

const reducers = persistReducer(persistConfig, rootReducer);

let middlewares = [thunkMiddleware, logger];

export const store = createStore(reducers, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

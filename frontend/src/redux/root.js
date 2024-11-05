import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/slice';
import blogReducer from './blog/slice';
import profileReducer from './profile/slice';
import dashboardReducer from './dashboard/slice';
import logReducer from './logs/slice';
import categoryReducer from './category/slice';
import translateReducer from './translation/slice';
import tourStepReducer from './tourStep/slice';

const persistConfig = {
  key: 'cms',
  storage,
  whitelist: ['auth'] // Only persist the auth state
};

const rootReducer = combineReducers({
  blogList: blogReducer,
  auth: authReducer,
  profile: profileReducer,
  dashboard: dashboardReducer,
  log: logReducer,
  category: categoryReducer,
  translate: translateReducer,
  tourStep: tourStepReducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

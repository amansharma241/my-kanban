import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import boardReducer from './slices/boardSlice.js';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, boardReducer);

export const store = configureStore({
  reducer: {
    board: persistedReducer,
  },
});

export const persistor = persistStore(store);

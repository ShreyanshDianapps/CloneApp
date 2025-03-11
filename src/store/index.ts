
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { reducers } from '../reducer';
// Persist configuration
const persistConfig = {
  key: 'root', // key for localStorage
  storage:AsyncStorage,
  whitelist: ['auth'],
};
// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers);
// Create store with middleware
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
  });
// export type RootState = ReturnType<typeof store.getState>;export type AppDispatch = typeof store.dispatch;
// Create persistor
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;




export default store;

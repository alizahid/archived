import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { searchReducer } from './search'

const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

const reducers = combineReducers({
  search: searchReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),
  reducer: persistedReducer
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof persistedReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()

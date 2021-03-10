import { createStore, createTypedHooks } from 'easy-peasy'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import model, { StoreModel } from './models'

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>()

const store = createStore(model, {
  reducerEnhancer(reducer) {
    return persistReducer(
      {
        storage,
        key: 'easypeasystate',
        whitelist: ['favorites']
      },
      reducer
    )
  }
})

const persistor = persistStore(store)

export { persistor, store, useStoreActions, useStoreState }

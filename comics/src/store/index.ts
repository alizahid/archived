import AsyncStorage from '@react-native-community/async-storage'
import { defaults } from 'react-sweet-state'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const persist = store => next => state => {
  AsyncStorage.setItem('@comics', JSON.stringify(store.getState()))

  return next(state)
}

defaults.middlewares.add(persist)

export { useComics } from './comics'

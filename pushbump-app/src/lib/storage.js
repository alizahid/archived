import { AsyncStorage } from 'react-native'

export default class Storage {
  static get(key) {
    return AsyncStorage.getItem(key)
  }

  static put(key, value) {
    return AsyncStorage.setItem(key, value)
  }
}

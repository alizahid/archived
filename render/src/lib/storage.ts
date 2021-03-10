import AsyncStorage from '@react-native-community/async-storage'

class Storage {
  get(key: string) {
    return AsyncStorage.getItem(key)
  }

  put(key: string, value: string) {
    return AsyncStorage.setItem(key, value)
  }

  remove(key: string) {
    return AsyncStorage.removeItem(key)
  }

  clear() {
    return AsyncStorage.clear()
  }
}

export const storage = new Storage()

import AsyncStorage from '@react-native-community/async-storage'

class Storage {
  async getItem(key: string) {
    const value = await AsyncStorage.getItem(key)

    if (value) {
      return JSON.parse(value)
    }
  }

  setItem(key: string, data: any) {
    const value = JSON.stringify(data)

    return AsyncStorage.setItem(key, value)
  }

  removeItem(key: string) {
    return AsyncStorage.removeItem(key)
  }
}

export default new Storage()

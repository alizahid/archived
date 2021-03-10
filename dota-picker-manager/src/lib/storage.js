export default {
  get(key) {
    const value = localStorage.getItem(key)

    if (value) {
      return JSON.parse(value)
    }
  },
  put(key, value) {
    const data = JSON.stringify(value)

    localStorage.setItem(key, data)

    return this
  },
  remove(key) {
    localStorage.removeItem(key)

    return this
  },
  clear() {
    localStorage.clear()

    return this
  }
}

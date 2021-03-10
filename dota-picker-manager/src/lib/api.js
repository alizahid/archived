import { storage } from './'

const { REACT_APP_API_URI } = process.env

export default {
  get(url) {
    return this.request({
      url,
      method: 'GET'
    })
  },
  post(url, data) {
    return this.request({
      data,
      url,
      method: 'POST'
    })
  },
  put(url, data) {
    return this.request({
      data,
      url,
      method: 'PUT'
    })
  },
  delete(url, data) {
    return this.request({
      url,
      data: data || {},
      method: 'DELETE'
    })
  },

  async request(options = {}) {
    const { data, url, method } = options

    const body = data && JSON.stringify(data)

    const headers = {
      'Content-Type': 'application/json'
    }

    const token = storage.get('token')

    if (token) {
      headers.auth = token
    }

    const response = await fetch(REACT_APP_API_URI + url, {
      body,
      headers,
      method
    })

    const json = await response.json()

    if (json.error) {
      const { error, message } = json

      throw message || error
    }

    return json
  }
}

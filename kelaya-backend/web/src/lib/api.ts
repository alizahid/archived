const { REACT_APP_API_URI } = process.env

class API {
  async get<T>(uri: string): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    const token = localStorage.getItem('@token')

    if (token) {
      headers['X-TOKEN'] = token
    }

    const response = await fetch(`${REACT_APP_API_URI}${uri}`, {
      headers,
      method: 'GET'
    })

    const data = await response.json()

    if (response.status >= 400) {
      throw data
    }

    return data
  }

  async post<T>(uri: string, body: object): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    const token = localStorage.getItem('@token')

    if (token) {
      headers['X-TOKEN'] = token
    }

    const response = await fetch(`${REACT_APP_API_URI}${uri}`, {
      body: JSON.stringify(body),
      headers,
      method: 'POST'
    })

    const data = await response.json()

    if (response.status >= 400) {
      throw data
    }

    return data
  }
}

export const api = new API()

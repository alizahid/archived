import { extendObservable, ObservableMap } from 'mobx'

import { api, storage } from '../lib'

export default class Auth {
  constructor() {
    extendObservable(this, {
      id: null,
      admin: false,
      auth: !!storage.get('token'),
      password: new ObservableMap(),
      session: new ObservableMap(),
      user: new ObservableMap()
    })

    this.getUser()
  }

  async getUser() {
    if (!this.auth) {
      return
    }

    try {
      this.user.clear()
      this.user.set('loading', true)

      const { user } = await api.get('/users/me')

      this.setId(user.id)
      this.setAdmin(user.admin)
    } catch (err) {
      this.user.set('error', err)
    } finally {
      this.user.set('loading', false)
    }
  }

  async login(username, password) {
    if (this.auth) {
      return
    }

    try {
      this.session.clear()
      this.session.set('loading', true)

      const { user } = await api.post('/sessions', {
        user: {
          username,
          password
        }
      })

      storage.put('token', user.token)

      this.setAdmin(user.admin)
      this.setAuth(true)
    } catch (err) {
      this.session.set('error', err)
    } finally {
      this.session.set('loading', false)
    }
  }

  logout() {
    storage.remove('token')

    this.setAdmin(false)
    this.setAuth(false)
  }

  async changePassword(password, newPassword) {
    if (!this.auth) {
      return
    }

    try {
      this.password.clear()
      this.password.set('loading', true)

      await api.post('/users/password', {
        password: {
          password,
          newPassword
        }
      })

      this.password.set('message', 'Password updated')
    } catch (err) {
      this.password.set('error', err)
    } finally {
      this.password.set('loading', false)
    }
  }

  setId(id) {
    this.id = id
  }

  setAdmin(admin) {
    this.admin = !!admin
  }

  setAuth(auth) {
    this.auth = !!auth
  }
}

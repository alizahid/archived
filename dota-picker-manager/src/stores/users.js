import { extendObservable, ObservableMap } from 'mobx'

import { auth } from './'

import { api } from '../lib'

export default class Users {
  constructor() {
    extendObservable(this, {
      error: null,
      loading: false,
      users: [],
      logs: [],
      log: new ObservableMap(),
      add: new ObservableMap(),
      update: new ObservableMap(),
      remove: new ObservableMap()
    })
  }

  async getUsers() {
    if (!auth.admin) {
      return
    }

    try {
      this.error = null
      this.loading = true

      const { users } = await api.get('/users')

      this.users = users
    } catch (err) {
      this.error = err
    } finally {
      this.loading = false
    }
  }

  async getLogs() {
    if (!auth.auth) {
      return
    }

    try {
      this.log.clear()
      this.log.set('loading', true)

      const { logs } = await api.get('/users/me/logs')

      this.logs = logs
    } catch (err) {
      this.log.set('error', err)
    } finally {
      this.log.set('loading', false)
    }
  }

  async addUser(username, password) {
    if (!auth.admin) {
      return
    }

    try {
      this.add.clear()
      this.add.set('loading', true)

      const { user } = await api.post('/users', {
        user: {
          username,
          password
        }
      })

      this.add.set('message', 'User added')

      this.users.push(user)
    } catch (err) {
      this.add.set('error', err)
    } finally {
      this.add.set('loading', false)
    }
  }

  async updateUser(id, props) {
    if (!auth.admin) {
      return
    }

    try {
      this.update.clear()
      this.update.set('loading', true)

      const { user } = await api.put(`/users/${id}`, {
        user: props
      })

      this.update.set('message', 'User updated')

      const index = this.users.findIndex(user => id === user.id)

      this.users[index] = user
    } catch (err) {
      this.update.set('error', err)
    } finally {
      this.update.set('loading', false)
    }
  }

  async removeUser(user) {
    if (!auth.admin) {
      return
    }

    try {
      this.remove.clear()
      this.remove.set('loading', true)

      await api.delete(`/users/${user.id}`)

      this.remove.set('message', 'User removed')

      const index = this.users.findIndex(({ id }) => id === user.id)

      this.users.splice(index, 1)
    } catch (err) {
      this.remove.set('error', err)
    } finally {
      this.remove.set('loading', false)
    }
  }
}

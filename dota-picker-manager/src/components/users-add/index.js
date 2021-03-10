import React, { Component } from 'react'

import { Modal, Spinner } from '../'

import './index.css'

export default class UsersAdd extends Component {
  state = {}

  onChangeUsername = event => {
    this.setState({
      username: event.target.value
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  add = event => {
    event.preventDefault()

    const { store } = this.props
    const { username, password } = this.state

    if (username && password) {
      store.addUser(username, password)
    }
  }

  close = () => {
    const { store, onClose } = this.props

    store.add.clear()

    onClose()
  }

  render() {
    const { error, loading, message } = this.props

    return (
      <Modal title="Add user" onClose={this.close}>
        <form className="users-add" onSubmit={this.add}>
          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}
          <label>
            <input
              type="text"
              placeholder="Username"
              onChange={this.onChangeUsername}
              disabled={loading}
              required
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              onChange={this.onChangePassword}
              disabled={loading}
              required
            />
          </label>
          <div>
            <button disabled={loading}>
              {loading && <Spinner button />}
              {!loading && 'Add'}
            </button>
            <button type="button" disabled={loading} onClick={this.close}>
              {message && 'Close'}
              {!message && 'Cancel'}
            </button>
          </div>
        </form>
      </Modal>
    )
  }
}

import React, { Component } from 'react'

import { Modal, Spinner } from '../'

import './index.css'

export default class UsersEdit extends Component {
  constructor(props) {
    super(props)

    const { user } = this.props
    const { username } = user

    this.state = {
      username
    }
  }

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

  update = event => {
    event.preventDefault()

    const { store, user } = this.props
    const { username, password } = this.state

    if (username) {
      const { id } = user

      store.updateUser(id, {
        username,
        password
      })
    }
  }

  close = () => {
    const { store, onClose } = this.props

    store.update.clear()

    onClose()
  }

  render() {
    const { error, loading, message, onClose } = this.props
    const { username } = this.state

    return (
      <Modal title="Edit user" onClose={onClose}>
        <form className="users-edit" onSubmit={this.update}>
          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}
          <label>
            <input
              type="text"
              placeholder="Username"
              value={username}
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
            />
          </label>
          <div>
            <button disabled={loading}>
              {loading && <Spinner button />}
              {!loading && 'Save'}
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

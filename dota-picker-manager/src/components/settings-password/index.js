import React, { Component } from 'react'

import { Spinner } from '../'

import './index.css'

export default class UserAdd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      newPassword: ''
    }
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  onChangeNewPassword = event => {
    this.setState({
      newPassword: event.target.value
    })
  }

  changePassword = async event => {
    event.preventDefault()

    const { store } = this.props
    const { password, newPassword } = this.state

    if (password && newPassword) {
      await store.changePassword(password, newPassword)
    }
  }

  reset = () => {
    const { store } = this.props

    store.password.clear()

    this.setState({
      password: '',
      newPassword: ''
    })
  }

  render() {
    const { error, loading, message } = this.props
    const { password, newPassword } = this.state

    return (
      <form className="settings-password" onSubmit={this.changePassword}>
        {message && (
          <div className="message" onClick={this.reset}>
            {message}
          </div>
        )}
        {error && (
          <div className="error" onClick={this.reset}>
            {error}
          </div>
        )}
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
            disabled={loading}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={this.onChangeNewPassword}
            disabled={loading}
            required
          />
        </label>
        <div>
          <button disabled={loading}>
            {loading && <Spinner button />}
            {!loading && 'Update'}
          </button>
        </div>
      </form>
    )
  }
}

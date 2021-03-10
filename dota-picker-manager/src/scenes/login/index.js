import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { Overlay, Spinner } from '../../components'

import './index.css'

class Login extends Component {
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

  login = event => {
    event.preventDefault()

    const { auth } = this.props
    const { username, password } = this.state

    if (username && password) {
      auth.login(username, password)
    }
  }

  render() {
    const { auth, session } = this.props.auth

    if (auth) {
      return <Redirect to="/" />
    }

    const { error, loading } = session

    return (
      <Overlay>
        <form className="login" onSubmit={this.login}>
          {error && <div className="error">{error}</div>}
          <label>
            <input
              type="text"
              placeholder="Username"
              onChange={this.onChangeUsername}
              required
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              onChange={this.onChangePassword}
              required
            />
          </label>
          <div>
            <button disabled={loading}>
              {loading && <Spinner button />}
              {!loading && 'Login'}
            </button>
          </div>
        </form>
      </Overlay>
    )
  }
}

export default inject('auth')(observer(Login))

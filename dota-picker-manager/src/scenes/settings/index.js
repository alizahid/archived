import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { SettingsPassword } from '../../components'

import './index.css'

class Settings extends Component {
  render() {
    const { auth } = this.props

    if (!auth.auth) {
      return <Redirect to="/" />
    }

    const { password } = auth

    return (
      <div className="settings">
        <h2>Settings</h2>
        <section>
          <h3>Change password</h3>
          <SettingsPassword
            store={auth}
            error={password.get('error')}
            loading={password.get('loading')}
            message={password.get('message')}
          />
        </section>
      </div>
    )
  }
}

export default inject('auth')(observer(Settings))

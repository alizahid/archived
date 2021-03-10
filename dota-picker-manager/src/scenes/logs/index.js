import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import { Spinner } from '../../components'

import './index.css'

class Logs extends Component {
  componentDidMount() {
    const { users } = this.props

    users.getLogs()
  }

  render() {
    const { auth, heroes, users } = this.props

    if (!auth.auth) {
      return <Redirect to="/" />
    }

    const { log, logs } = users

    const loading = log.get('loading')

    return (
      <div className="logs">
        <h2>Logs</h2>
        <table>
          <thead>
            <tr>
              <th>Hero</th>
              <th>Action</th>
              <th>Changes</th>
              <th>Updated</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>
                    {heroes.getHero(log.hero)
                      ? heroes.getHero(log.hero).name
                      : '-'}
                  </td>
                  <td className="action">{log.action}</td>
                  <td className="changes">
                    {JSON.stringify(log.changes, null, 2)}
                  </td>
                  <td title={moment(log.created).format('LLLL')}>
                    {moment(log.created).fromNow()}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {loading && <Spinner size="large" />}
      </div>
    )
  }
}

export default inject('auth', 'heroes', 'users')(observer(Logs))

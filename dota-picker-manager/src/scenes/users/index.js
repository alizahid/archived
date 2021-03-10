import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import {
  Overlay,
  Spinner,
  UsersAdd,
  UsersRemove,
  UsersEdit
} from '../../components'

import './index.css'

class Users extends Component {
  state = {
    adding: false,
    editing: null,
    removing: null
  }

  componentDidMount() {
    const { users } = this.props

    users.getUsers()
  }

  toggleAdding = () => {
    const { adding } = this.state

    this.setState({
      adding: !adding
    })
  }

  toggleEditing = user => {
    this.setState({
      editing: user ? user : null
    })
  }

  toggleRemoving = user => {
    this.setState({
      removing: user ? user : null
    })
  }

  render() {
    const { admin, user } = this.props.auth

    if (user.get('loading')) {
      return <Overlay template="loading" />
    }

    if (!admin) {
      return <Redirect to="/" />
    }

    const { adding, editing, removing } = this.state

    const store = this.props.users

    const { loading, users, add, update, remove } = store

    return (
      <div className="users">
        <header>
          <h2>Users</h2>
          <button onClick={this.toggleAdding} />
        </header>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Admin</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.admin ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="edit"
                    onClick={() => this.toggleEditing(user)}
                  />
                  <button
                    className="remove"
                    onClick={() => this.toggleRemoving(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && users.length === 0 && <div>No users found</div>}
        {loading && <Spinner size="large" />}
        {adding && (
          <UsersAdd
            store={store}
            error={add.get('error')}
            loading={add.get('loading')}
            message={add.get('message')}
            onClose={this.toggleAdding}
          />
        )}
        {editing && (
          <UsersEdit
            store={store}
            error={update.get('error')}
            loading={update.get('loading')}
            message={update.get('message')}
            user={editing}
            onClose={() => this.toggleEditing(null)}
          />
        )}
        {removing && (
          <UsersRemove
            store={store}
            error={remove.get('error')}
            loading={remove.get('loading')}
            message={remove.get('message')}
            user={removing}
            onClose={() => this.toggleRemoving(null)}
          />
        )}
      </div>
    )
  }
}

export default inject('auth', 'users')(observer(Users))

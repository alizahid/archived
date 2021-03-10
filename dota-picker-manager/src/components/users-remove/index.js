import React, { Component } from 'react'

import { Modal, Spinner } from '../'

import './index.css'

export default class UsersRemove extends Component {
  handleClick(event) {
    event.stopPropagation()
  }

  remove = event => {
    event.preventDefault()

    const { store, user } = this.props

    store.removeUser(user)
  }

  close = () => {
    const { store, onClose } = this.props

    store.remove.clear()

    onClose()
  }

  render() {
    const { error, loading, message, user } = this.props

    return (
      <Modal title="Remove user" onClose={this.close}>
        <form className="users-remove" onSubmit={this.remove}>
          {error && <div className="error">{error}</div>}
          <section>
            {message}
            {!message && (
              <p>
                Are you sure you want to remove <span>{user.username}</span>?
              </p>
            )}
          </section>
          {message && (
            <div>
              <button type="button" onClick={this.close}>
                Close
              </button>
            </div>
          )}
          {!message && (
            <div>
              <button onClick={this.remove} disabled={loading}>
                {loading && <Spinner button />}
                {!loading && 'Yes'}
              </button>
              <button type="button" onClick={this.close} disabled={loading}>
                No
              </button>
            </div>
          )}
        </form>
      </Modal>
    )
  }
}

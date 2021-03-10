import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { Avatar, Modal, Spinner } from '../'

import './index.css'

class Counter extends Component {
  constructor(props) {
    super(props)

    const { why } = props

    this.state = {
      why,
      editing: false,
      removing: false,
      modal: false
    }
  }

  format(text) {
    return text
      .split('\n')
      .filter(text => text)
      .map((text, index) => <p key={index}>{text}</p>)
  }

  toggleModal = () => {
    const { modal } = this.state

    this.setState({
      modal: !modal
    })

    const { update } = this.props.heroes

    update.clear()
  }

  toggleEditing = () => {
    const { editing } = this.state

    this.setState({
      editing: !editing
    })

    const { update } = this.props.heroes

    update.clear()
  }

  toggleRemoving = () => {
    const { removing } = this.state

    this.setState({
      removing: !removing
    })

    const { remove } = this.props.heroes

    remove.clear()
  }

  onChangeWhy = event => {
    this.setState({
      why: event.target.value
    })
  }

  remove = event => {
    event.preventDefault()

    const { id, main, type, heroes } = this.props

    heroes.removeCounter(main, {
      id,
      type
    })
  }

  update = event => {
    event.preventDefault()

    const { id, main, type, heroes } = this.props
    const { why } = this.state

    heroes.updateCounter(main, {
      id,
      type,
      why
    })
  }

  title = () => {
    const store = this.props.heroes

    const { id, main, type } = this.props

    const mainHero = store.getHero(main)
    const counterHero = store.getHero(id)

    switch (type) {
      case 'strong':
        return `Why is ${mainHero.name} strong against ${counterHero.name}?`
      case 'weak':
        return `Why is ${mainHero.name} weak against ${counterHero.name}?`
      case 'combo':
        return `Why does ${mainHero.name} work well with ${counterHero.name}?`
      default:
        return 'Why?'
    }
  }

  render() {
    const store = this.props.heroes

    const { id } = this.props
    const { editing, removing, modal, why } = this.state

    const { remove, update } = store

    const removeError = remove.get('error')
    const removeLoading = remove.get('loading')

    const updateError = update.get('error')
    const updateLoading = update.get('loading')
    const updateMessage = update.get('message')

    return (
      <div className="counter" onClick={this.toggleModal}>
        <Avatar id={id} size="small" />
        {modal && (
          <Modal title={this.title()} onClose={this.toggleModal}>
            <Avatar id={id} size="small" />
            {editing &&
              !removing && (
                <form onSubmit={this.update}>
                  {updateMessage && (
                    <div className="message">{updateMessage}</div>
                  )}
                  {updateError && <div className="error">{updateError}</div>}
                  <label>
                    <textarea
                      value={why}
                      onChange={this.onChangeWhy}
                      disabled={updateLoading}
                      placeholder="Why?"
                    />
                  </label>
                  <div>
                    <button disabled={updateLoading}>
                      {updateLoading && <Spinner button />}
                      {!updateLoading && 'Save'}
                    </button>
                    <button type="button" onClick={this.toggleEditing}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            {!editing &&
              !removing && (
                <div>
                  <h3>Reason</h3>
                  <div>{this.format(why || 'No information given')}</div>
                  <button onClick={this.toggleEditing}>Edit</button>
                  <button className="remove" onClick={this.toggleRemoving}>
                    Remove
                  </button>
                </div>
              )}
            {!editing &&
              removing && (
                <form className="remove" onSubmit={this.remove}>
                  {removeError && <div className="error">{removeError}</div>}
                  <section>
                    <p>Are you sure you want to remove this counter?</p>
                  </section>
                  <div>
                    <button disabled={removeLoading}>
                      {removeLoading && <Spinner button />}
                      {!removeLoading && 'Yes'}
                    </button>
                    <button
                      type="button"
                      onClick={this.toggleRemoving}
                      disabled={removeLoading}
                    >
                      No
                    </button>
                  </div>
                </form>
              )}
          </Modal>
        )}
      </div>
    )
  }
}

export default inject('heroes')(observer(Counter))

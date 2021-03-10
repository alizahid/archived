import React, { Component } from 'react'

import { Overlay } from '../'

import './index.css'

export default class Modal extends Component {
  handleClick(event) {
    event.stopPropagation()
  }

  render() {
    const { children, title, onClose } = this.props

    return (
      <Overlay veil onClick={onClose}>
        <div className="modal" onClick={this.handleClick}>
          <header>
            <h4>{title}</h4>
            <button onClick={onClose} />
          </header>
          <section>{children}</section>
        </div>
      </Overlay>
    )
  }
}

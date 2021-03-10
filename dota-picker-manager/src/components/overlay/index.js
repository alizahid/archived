import React, { Component } from 'react'

import { Spinner } from '../'

import './index.css'

export default class Overlay extends Component {
  render() {
    const { children, template, veil, onClick } = this.props

    return (
      <div className={`overlay ${veil ? 'veil' : ''}`} onClick={onClick}>
        {template === 'filters' && (
          <section className="not-found">Nothing matches your filters</section>
        )}
        {template === 'loading' && (
          <section className="loading">
            <Spinner />
          </section>
        )}
        {template === 'not-found' && (
          <section className="not-found">Not found</section>
        )}
        {children}
      </div>
    )
  }
}

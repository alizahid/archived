import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    const { next, prev } = this.props

    return (
      <footer>
        {prev && (
          <a href={`${prev}.html`} id="prev">
            Prev
          </a>
        )}
        {next && (
          <a href={`${next}.html`} id="next">
            Next
          </a>
        )}
      </footer>
    )
  }
}

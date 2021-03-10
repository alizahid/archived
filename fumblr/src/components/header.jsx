import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    const {
      blog: { description, name, title }
    } = this.props

    const avatar = `https://api.tumblr.com/v2/blog/${name}.tumblr.com/avatar/512`

    return (
      <header>
        <div>
          <img src={avatar} />
          <h1>{title}</h1>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: description
          }}
        />
      </header>
    )
  }
}

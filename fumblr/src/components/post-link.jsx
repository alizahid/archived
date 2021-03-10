import React, { Component } from 'react'
import moment from 'moment'

export default class PostLink extends Component {
  render() {
    const {
      post: { description, timestamp, title, url }
    } = this.props

    const time = moment(timestamp * 1000)

    return (
      <section>
        <header>
          <h2>{title}</h2>
        </header>
        <article>
          <div
            dangerouslySetInnerHTML={{
              __html: description
            }}
          />
          <a href={url} target="_blank" className="link">
            Go
          </a>
        </article>
        <footer>
          <span title={time.format('LLLL')}>{time.fromNow()}</span>
        </footer>
      </section>
    )
  }
}

import React, { Component } from 'react'
import moment from 'moment'

import Assets from '../lib/assets'

export default class PostText extends Component {
  render() {
    const { post } = this.props

    const { body, timestamp, title } = post

    const time = moment(timestamp * 1000)

    return (
      <section>
        <header>
          <h2>{title}</h2>
        </header>
        <article>
          <div
            dangerouslySetInnerHTML={{
              __html: Assets.fetchAll(body, post)
            }}
          />
        </article>
        <footer>
          <span title={time.format('LLLL')}>{time.fromNow()}</span>
        </footer>
      </section>
    )
  }
}

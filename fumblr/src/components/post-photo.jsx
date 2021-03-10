import React, { Component } from 'react'
import moment from 'moment'

import Assets from '../lib/assets'

export default class PostPhoto extends Component {
  render() {
    const { post } = this.props

    const { caption, photos, timestamp } = post

    const time = moment(timestamp * 1000)

    return (
      <section>
        <article>
          {photos.map(({ caption, original_size: { url } }, index) => (
            <figure key={index}>
              <img src={Assets.fetch(url, post)} />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </article>
        <header
          dangerouslySetInnerHTML={{
            __html: caption
          }}
        />
        <footer>
          <span title={time.format('LLLL')}>{time.fromNow()}</span>
        </footer>
      </section>
    )
  }
}

import React, { Component } from 'react'
import moment from 'moment'

import Assets from '../lib/assets'

export default class PostVideo extends Component {
  render() {
    const { post } = this.props

    const { caption, player, timestamp, video_type, video_url } = post

    const { embed_code } = player.pop()

    const time = moment(timestamp * 1000)

    return (
      <section>
        <article>
          {video_type === 'tumblr' && (
            <figure>
              <video src={Assets.fetch(video_url, post)} />
            </figure>
          )}
          {video_type !== 'tumblr' && (
            <figure
              dangerouslySetInnerHTML={{
                __html: embed_code
              }}
            />
          )}
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

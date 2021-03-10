import React, { Component } from 'react'

import Header from './header'
import Footer from './footer'

import PostLink from './post-link'
import PostPhoto from './post-photo'
import PostText from './post-text'
import PostVideo from './post-video'

export default class Post extends Component {
  renderPost(post) {
    const { type } = post

    switch (type) {
      case 'link':
        return <PostLink post={post} />

      case 'photo':
        return <PostPhoto post={post} />

      case 'text':
        return <PostText post={post} />

      case 'video':
        return <PostVideo post={post} />

      default:
        return null
    }
  }

  render() {
    const { blog, next, post, prev } = this.props

    return (
      <div className="fumblr">
        <Header blog={blog} />
        {this.renderPost(post)}
        <Footer next={next} prev={prev} />
      </div>
    )
  }
}

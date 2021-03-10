import fs from 'fs-extra'
import React from 'react'
import { get } from 'lodash'
import { renderToStaticMarkup } from 'react-dom/server'

import Post from '../components/post'
import html from '../templates/html'

class Pages {
  /**
   * Generate static pages
   * @param {Object} blog Blog details
   * @param {Object} posts Blog posts
   * @return {Promise} Save pages to disk
   */
  async generate(blog, posts) {
    // name
    const { name } = blog

    // save raw json
    await fs.outputJson(`blogs/${name}/${name}.json`, {
      blog,
      posts
    })

    // build static pages and save to disk
    posts.map((post, index) => {
      // html
      const body = renderToStaticMarkup(
        <Post
          blog={blog}
          post={post}
          next={this.next(posts, index)}
          prev={this.prev(posts, index)}
        />
      )

      // slug
      const { slug } = post

      // html
      const data = html(blog, body)

      // save html
      return fs.outputFile(
        `blogs/${name}/${index}-${slug || 'post'}.html`,
        data
      )
    })

    return Promise.all(posts)
  }

  /**
   * Get next post
   * @param {Object[]} posts Posts
   * @param {Number} index Current index
   * @return {String} Slug
   * @private
   */
  next(posts, index) {
    // increment index
    index++

    // key
    const key = get(posts, `${index}.slug`)

    if (typeof key === 'string') {
      return `${index}-${key || 'post'}`
    }
  }

  /**
   * Get previous post
   * @param {Object[]} posts Posts
   * @param {Number} index Current index
   * @return {String} Slug
   * @private
   */
  prev(posts, index) {
    // decrement index
    index--

    // key
    const key = get(posts, `${index}.slug`)

    if (typeof key === 'string') {
      return `${index}-${key || 'post'}`
    }
  }
}

export default new Pages()

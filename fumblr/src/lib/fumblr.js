import dotenv from 'dotenv'
import tumblr from 'tumblr.js'
import { get, last, sortBy } from 'lodash'

import Pages from './pages'

dotenv.config()

const {
  LIMIT,
  TUMBLR_OAUTH_CONSUMER_KEY,
  TUMBLR_OAUTH_CONSUMER_SECRET,
  TUMBLR_OAUTH_TOKEN,
  TUMBLR_OAUTH_TOKEN_SECRET
} = process.env

class Fumblr {
  constructor() {
    // set limit
    this.limit = Number(LIMIT)

    // create client
    this.client = tumblr.createClient({
      credentials: {
        consumer_key: TUMBLR_OAUTH_CONSUMER_KEY,
        consumer_secret: TUMBLR_OAUTH_CONSUMER_SECRET,
        token: TUMBLR_OAUTH_TOKEN,
        token_secret: TUMBLR_OAUTH_TOKEN_SECRET
      },
      returnPromises: true
    })
  }

  /**
   * Fetch a blog
   * @param {Object} options Options
   */
  async fetch(options) {
    const { name, following } = options

    if (following) {
      // get all following blogs
      const blogs = await this.getFollowing()

      // download them
      for (const blog of blogs) {
        await this.download(blog)
      }
    } else if (name) {
      // download blog
      await this.download(name)
    }
  }

  /**
   * Download a blog
   * @param {String} name Blog name
   * @private
   */
  async download(name) {
    // fetch blog details
    const blog = await this.getBlog(name)

    // fetch and sort posts
    const posts = sortBy(await this.getPosts(name), 'timestamp')

    // generate pages
    await Pages.generate(blog, posts)
  }

  /**
   * Get blog
   * @param {String} name Blog name
   * @private
   */
  async getBlog(name) {
    // fetch blog details
    const { blog } = await this.client.blogInfo(name)

    return blog
  }

  /**
   * Get all blogs the user follows
   * @param {Number} offset Pagination offset
   * @param {Object[]} data Blogs
   * @return {String[]} Blog names
   * @private
   */
  async getFollowing(offset = 0, data = []) {
    // fetch all blogs
    const { blogs, _links } = await this.client.userFollowing({
      offset
    })

    // add to array
    data.push(...blogs)

    // next offset
    const next = get(_links, 'next.query_params.offset')

    if (next) {
      // fetch more blogs
      return this.getFollowing(Number(next), data)
    }

    // all fetched
    return data.map(({ name }) => name)
  }

  /**
   * Get posts
   * @param {String} name Blog name
   * @param {Number} before Timestamp for pagination
   * @param {Object[]} data Posts
   * @private
   */
  async getPosts(name, before, data = []) {
    // fetch posts
    const response = await this.client.blogPosts(name, {
      before,
      limit: this.limit
    })

    // posts
    const { posts } = response

    // stop recursion
    if (posts.length === 0) {
      return data
    }

    // add posts to array
    data.push(...posts)

    // get timestamp
    const { timestamp } = last(posts)

    // fetch more posts
    return this.getPosts(name, timestamp, data)
  }
}

export default new Fumblr()

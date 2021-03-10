import { extname, join, resolve } from 'path'

import { queue } from 'async'
import dotenv from 'dotenv'
import fs from 'fs-extra'
import request from 'request'
import shorthash from 'shorthash'

dotenv.config()

const { ATTEMPTS, CONCURRENCY } = process.env

const attempts = Number(ATTEMPTS)
const concurrency = Number(CONCURRENCY)

class Asset {
  constructor() {
    this.attempts = {}

    // setup queue
    this.queue = queue(this.download, concurrency)
  }

  /**
   *
   * Fetch asset
   * @param {String} uri Asset uri
   * @param {Object} post Post
   * @return {String} Asset path
   */
  fetch(uri, post) {
    // name
    const {
      id,
      blog: { name }
    } = post

    // generate id
    const slug = shorthash.unique(uri)

    // file extension
    const extension = extname(uri)

    // build file path
    const path = join('assets', `${id}-${slug}${extension}`)

    // build file path
    const file = resolve(__dirname, '..', '..', 'blogs', name, path)

    // queue asset for download
    this.addToQueue(file, uri)

    return path
  }

  /**
   * Fetch all assets
   * @param {String} html HTML markup to parse
   * @param {Object} post Post
   * @return {String} Parsed HTML markup
   */
  fetchAll(html, post) {
    // find uris
    const matches = html.match(/src="(.*?)"/gi)

    if (matches) {
      // clean up
      const uris = matches.map(uri => uri.slice(5, -1))

      // iterate
      uris.forEach(uri => {
        // get path
        const path = this.fetch(uri, post)

        // replace
        html = html.replace(uri, path)
      })
    }

    return html
  }

  /**
   * Queue asset for download
   * @param {String} file File path
   * @param {String} uri Asset uri
   * @private
   */
  addToQueue(file, uri) {
    // generate id
    const slug = shorthash.unique(uri)

    // start attempt count
    if (!this.attempts[slug]) {
      this.attempts[slug] = 0
    }

    // check attempts limit
    if (this.attempts[slug] > attempts) {
      return
    }

    // add to queue
    this.queue.push({
      file,
      uri
    })

    // increment
    this.attempts[slug]++
  }

  /**
   * Download asset and save to disk
   * @param {Object} task Asset
   * @param {Function} callback Callback
   * @private
   */
  async download({ file, uri }, callback) {
    // make sure directory exists
    await fs.ensureFile(file)

    // download and save
    request(uri)
      .on('error', () => {
        callback()

        // add back to queue
        this.addToQueue(file, uri)
      })
      .on('response', () => callback())
      .pipe(fs.createWriteStream(file))
  }
}

export default new Asset()

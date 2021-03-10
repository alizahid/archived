const { REDIS_URL } = process.env

const { promisify } = require('util')

const redis = require('redis')
const shorthash = require('shorthash')

class Redis {
  constructor() {
    const client = redis.createClient(REDIS_URL)

    this.getAsync = promisify(client.get).bind(client)
    this.setAsync = promisify(client.set).bind(client)
  }

  async fetch(query, creator) {
    const hash = shorthash.unique(query)

    const cached = await this.get(hash)

    if (cached) {
      return cached
    }

    const data = await creator(query)

    await this.set(hash, data)

    return data
  }

  async get(key) {
    const data = await this.getAsync(key)

    return JSON.parse(data)
  }

  set(key, value) {
    const data = JSON.stringify(value)

    return this.setAsync(key, data)
  }
}

module.exports = new Redis()

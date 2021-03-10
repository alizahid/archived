const { CACHE_EXPIRY, REDIS_URI } = process.env

import Redis from 'ioredis'

import { Repository, SearchType, User } from '../types'
import { github } from './github'

class Cache {
  client = new Redis(REDIS_URI)

  async get(
    query: string,
    type: SearchType
  ): Promise<Array<Repository | User>> {
    const key = this.getKey(query, type)

    const cached = await this.client.get(key)

    if (cached) {
      return JSON.parse(cached)
    }

    const data = await github.search(query, type)

    await this.put(query, type, data)

    return data
  }

  async put(
    query: string,
    type: SearchType,
    data: Array<Repository | User>
  ): Promise<void> {
    const key = this.getKey(query, type)

    await this.client.set(key, JSON.stringify(data), 'EX', CACHE_EXPIRY)
  }

  private getKey(query: string, type: SearchType): string {
    return `${type}:${encodeURIComponent(query)}`
  }

  async clear(): Promise<void> {
    const keys = await this.client.keys('*')

    await Promise.all(keys.map((key) => this.client.del(key)))
  }
}

export const cache = new Cache()

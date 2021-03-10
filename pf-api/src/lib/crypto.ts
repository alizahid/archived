const { COINMARKETCAP_KEY } = process.env

import axios from 'axios'

import { CurrencyMetaResponse, Entity } from '../types'

export const getAll = async (start: number): Promise<Entity[]> => {
  const response = await request<CurrencyMetaResponse>('/cryptocurrency/map', {
    limit: 10,
    sort: 'cmc_rank',
    start: start
  })

  return response.data.map(({ id, name, rank, slug, symbol }) => ({
    data: {
      name,
      rank,
      slug,
      symbol
    },
    id
  }))
}

export const getOne = async (symbol: string): Promise<Entity | null> => {
  try {
    const response = await request<CurrencyMetaResponse>(
      '/cryptocurrency/map',
      {
        symbol
      }
    )

    const currency = response.data[0]

    return {
      data: {
        ...currency
      },
      id: currency.id
    }
  } catch (error) {
    if (error.response.data?.status?.error_code === 400) {
      return null
    }

    throw error
  }
}

const request = async <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> => {
  const { data } = await axios.request({
    headers: {
      'X-CMC_PRO_API_KEY': COINMARKETCAP_KEY
    },
    method: 'get',
    params,
    url: `https://pro-api.coinmarketcap.com/v1${url}`
  })

  return data
}

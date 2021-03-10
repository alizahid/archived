import axios from 'axios'

import {
  Entity,
  PeopleResponse,
  PersonResponse,
  PersonSearchResponse
} from '../types'

export const getPeople = async (page: number): Promise<Entity[]> => {
  const response = await request<PeopleResponse>('/people', {
    limit: 10,
    page
  })

  return response.results.map(({ name, uid }) => ({
    data: {
      name
    },
    id: Number(uid)
  }))
}

export const getPerson = async (id: number): Promise<Entity | null> => {
  try {
    const response = await request<PersonResponse>(`/people/${id}`)

    return {
      data: {
        name: response.result.properties.name
      },
      id: Number(response.result.uid)
    }
  } catch (error) {
    if (error.response.status === 404) {
      return null
    }

    throw error
  }
}

export const searchForPeople = async (query: string): Promise<Entity[]> => {
  const response = await request<PersonSearchResponse>('/people', {
    name: query
  })

  return response.results.map((person) => ({
    data: {
      name: person.properties.name
    },
    id: Number(person.uid)
  }))
}

const request = async <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> => {
  const { data } = await axios.request({
    method: 'get',
    params,
    url: `https://www.swapi.tech/api${url}`
  })

  return data
}

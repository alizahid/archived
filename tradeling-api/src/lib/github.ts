const { GITHUB_API_KEY, GITHUB_API_URI } = process.env

import axios from 'axios'

import {
  GitHubResultRepository,
  GitHubResultUser,
  GitHubUser,
  Repository,
  SearchType,
  User
} from '../types'

class GitHub {
  async search(
    query: string,
    type: SearchType
  ): Promise<Array<Repository | User>> {
    const { items } = await this.request<{
      items: Array<GitHubResultRepository | GitHubResultUser>
    }>(`/search/${type}?q=${encodeURIComponent(query)}`)

    if (type === 'repositories') {
      return items.map((item) =>
        this.getRepository(item as GitHubResultRepository)
      )
    }

    return Promise.all(
      items.map((item) => this.getUser((item as GitHubResultUser).login))
    )
  }

  private getRepository({
    description,
    forks,
    full_name,
    language,
    owner,
    stargazers_count
  }: GitHubResultRepository): Repository {
    return {
      description,
      forks,
      language,
      name: full_name,
      owner: {
        avatar: owner.avatar_url,
        login: owner.login
      },
      stars: stargazers_count
    }
  }

  private async getUser(login: string): Promise<User> {
    const {
      avatar_url,
      bio,
      blog,
      followers,
      following,
      location,
      name,
      twitter_username
    } = await this.request<GitHubUser>(`/users/${login}`)

    return {
      avatar: avatar_url,
      bio,
      blog,
      followers,
      following,
      location,
      login,
      name,
      twitter: twitter_username
    }
  }

  private async request<T>(uri: string): Promise<T> {
    const { data } = await axios.request<T>({
      headers: {
        authorization: `Bearer ${GITHUB_API_KEY}`
      },
      method: 'get',
      url: GITHUB_API_URI + uri
    })

    return data
  }
}

export const github = new GitHub()

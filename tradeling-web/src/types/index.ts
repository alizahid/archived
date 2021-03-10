export type SearchType = 'users' | 'repositories'

export type Repository = {
  description: string
  forks: number
  language: string
  name: string
  owner: {
    avatar: string
    login: string
  }
  stars: number
}

export type User = {
  avatar: string
  bio: string | null
  blog: string | null
  followers: number
  following: number
  location: string | null
  login: string
  name: string | null
  twitter: string | null
}

export type SearchParams = {
  query?: string
  type?: SearchType
}

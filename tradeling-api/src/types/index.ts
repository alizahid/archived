// api

export type SearchType = 'users' | 'repositories'

// github

export type GitHubResultRepository = {
  description: string
  forks: number
  full_name: string
  language: string
  owner: {
    avatar_url: string
    login: string
  }
  stargazers_count: number
}

export type GitHubResultUser = {
  login: string
}

export type GitHubUser = {
  avatar_url: string
  bio: string | null
  blog: string | null
  followers: number
  following: number
  location: string | null
  login: string
  name: string | null
  twitter_username: string | null
}

// app

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

// internal

export interface Exception extends Error {
  code: number
}

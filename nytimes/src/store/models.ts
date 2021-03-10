import { Action, Thunk, action, thunk } from 'easy-peasy'

import { api } from '../lib'

export interface Article {
  abstract: string
  byline: string
  id: number
  image: string
  published: any
  thumb: string
  title: string
  url: string
  views: number
}

export interface ArticlesModel {
  interval: number
  loading: boolean

  articles: Article[]

  fetchArticles: Thunk<ArticlesModel, number>

  setInterval: Action<ArticlesModel, number>
  setLoading: Action<ArticlesModel, boolean>
  setArticles: Action<ArticlesModel, Article[]>
}

const articles: ArticlesModel = {
  interval: 1,
  loading: false,

  articles: [],

  fetchArticles: thunk(async (actions, payload) => {
    actions.setLoading(true)

    const articles = await api.fetchArticles(payload)

    actions.setArticles(articles)

    actions.setLoading(false)
  }),

  setInterval: action((state, payload) => {
    state.interval = payload
  }),
  setLoading: action((state, payload) => {
    state.loading = payload
  }),
  setArticles: action((state, payload) => {
    state.articles = payload
  })
}

export interface StoreModel {
  articles: ArticlesModel
}

const model: StoreModel = {
  articles
}

export default model

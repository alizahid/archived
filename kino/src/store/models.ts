import { Action, Thunk, action, thunk } from 'easy-peasy'

import { api } from '../lib'

export interface Cast {
  character: string
  name: string
  profile_path: string
}

export interface Crew {
  job: string
  name: string
  profile_path: string
}

export interface Film {
  backdrop_path: string
  budget: number
  homepage: string
  id: number
  imdb_id: string
  overview: string
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  vote_average: number
  vote_count: number
  cast: Cast[]
  crew: Crew[]
  genres: {
    name: string
  }[]
}

export interface Result {
  id: number
  poster_path: string
  release_date: string
  title: string
  vote_average: number
}

interface FilmsModel {
  loading: boolean

  films: any

  fetch: Thunk<FilmsModel, number>

  setLoading: Action<FilmsModel, boolean>
  setFilm: Action<
    FilmsModel,
    {
      id: number
      film: Film
    }
  >
}

const films: FilmsModel = {
  loading: false,

  films: {},

  fetch: thunk(async (actions, id) => {
    actions.setLoading(true)

    const film = await api.fetch(id)

    actions.setFilm({
      film,
      id
    })

    actions.setLoading(false)
  }),

  setLoading: action((state, payload) => {
    state.loading = payload
  }),
  setFilm: action((state, { film, id }) => {
    state.films[id] = film
  })
}

interface ResultsModel {
  loading: boolean

  results: Result[]

  search: Thunk<ResultsModel, string>

  setLoading: Action<ResultsModel, boolean>
  setResults: Action<ResultsModel, Result[]>
}

const results: ResultsModel = {
  loading: false,

  results: [],

  search: thunk(async (actions, query) => {
    actions.setLoading(true)

    const films = await api.search(query)

    actions.setResults(films)

    actions.setLoading(false)
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),
  setResults: action((state, films) => {
    state.results = films
  })
}

interface FavoritesModel {
  favorites: Result[]

  toggle: Action<FavoritesModel, Film>
}

const favorites: FavoritesModel = {
  favorites: [],

  toggle: action((state, film) => {
    const index = state.favorites.findIndex(result => result.id === film.id)

    if (index >= 0) {
      state.favorites.splice(index, 1)
    } else {
      const { id, poster_path, release_date, title, vote_average } = film

      state.favorites.unshift({
        id,
        poster_path,
        release_date,
        title,
        vote_average
      })
    }
  })
}

export interface StoreModel {
  favorites: FavoritesModel
  films: FilmsModel
  results: ResultsModel
}

const model: StoreModel = {
  favorites,
  films,
  results
}

export default model

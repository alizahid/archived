import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { api } from '../lib'
import { Post } from '../types'

interface State {
  createError: string | null
  createLoading: boolean

  loading: boolean
  posts: Post[]
}

type StoreApi = StoreActionApi<State>

const actions = {
  create: (
    title: string,
    body: string,
    callback: (id: string) => void
  ) => async ({ getState, setState }: StoreApi) => {
    try {
      setState({
        createError: null,
        createLoading: true
      })

      const { post } = await api.post('/posts', {
        body,
        title
      })

      callback(post.id)
    } catch (error) {
      setState({
        createError: error.message
      })
    } finally {
      setState({
        createLoading: false
      })
    }
  },
  fetchAll: () => async ({ setState }: StoreApi) => {
    try {
      setState({
        loading: true
      })

      const { posts } = await api.get('/posts')

      setState({
        posts
      })
    } finally {
      setState({
        loading: false
      })
    }
  },
  fetchOne: (id: string) => async ({ getState, setState }: StoreApi) => {
    const { posts } = getState()

    const exists = posts.find((post) => post.id === id)

    if (exists) {
      return
    }

    try {
      setState({
        loading: true
      })

      const { post } = await api.get(`/posts/${id}`)

      const { posts } = getState()

      setState({
        posts: [post, ...posts]
      })
    } finally {
      setState({
        loading: false
      })
    }
  }
}

type Actions = typeof actions

const initialState: State = {
  createError: null,
  createLoading: false,
  loading: false,
  posts: []
}

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'posts'
})

export const usePosts = createHook(Store)

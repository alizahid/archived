import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { storage } from '../lib'

interface State {
  email: string | null
  loading: boolean
  token: string | null
  userId: string | null
}
type StoreApi = StoreActionApi<State>
type Actions = typeof actions

const initialState = {
  email: null,
  loading: false,
  token: null,
  userId: null
}

const actions = {
  init: () => async ({ setState }: StoreApi) => {
    setState({
      loading: true
    })

    const email = await storage.get('@email')
    const token = await storage.get('@token')
    const userId = await storage.get('@userId')

    setState({
      email,
      loading: false,
      token,
      userId
    })
  },
  login: ({
    email,
    token,
    userId
  }: {
    email: string
    token: string
    userId: string
  }) => async ({ setState }: StoreApi) => {
    await storage.put('@email', email)
    await storage.put('@token', token)
    await storage.put('@userId', userId)

    setState({
      email,
      token,
      userId
    })
  },
  logout: () => async ({ setState }: StoreApi) => {
    setState({
      loading: true
    })

    await storage.remove('@email')
    await storage.remove('@token')
    await storage.remove('@userId')

    setState({
      email: null,
      loading: false,
      token: null,
      userId: null
    })
  }
}

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'auth'
})

export const useAuth = createHook(Store)

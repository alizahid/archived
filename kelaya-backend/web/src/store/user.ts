import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { api } from '../lib'

interface State {
  signInError: null
  signInLoading: boolean

  signUpError: string | null
  signUpLoading: boolean

  token: string | null
}

type StoreApi = StoreActionApi<State>

const actions = {
  signIn: (username: string, password: string) => async ({
    setState
  }: StoreApi) => {
    try {
      setState({
        signInError: null,
        signInLoading: true
      })

      const { token } = await api.post('/users/auth', {
        password,
        username
      })

      if (token) {
        localStorage.setItem('@token', token)

        setState({
          token
        })
      }
    } catch (error) {
      setState({
        signInError: error.message
      })
    } finally {
      setState({
        signInLoading: false
      })
    }
  },
  signOut: () => async ({ setState }: StoreApi) => {
    localStorage.removeItem('@token')

    setState({
      token: null
    })
  },
  signUp: (username: string, password: string) => async ({
    setState
  }: StoreApi) => {
    try {
      setState({
        signUpError: null,
        signUpLoading: true
      })

      const { token } = await api.post('/users', {
        password,
        username
      })

      if (token) {
        localStorage.setItem('@token', token)

        setState({
          token
        })
      }
    } catch (error) {
      setState({
        signUpError: error.message
      })
    } finally {
      setState({
        signUpLoading: false
      })
    }
  }
}

type Actions = typeof actions

const initialState: State = {
  signInError: null,
  signInLoading: false,
  signUpError: null,
  signUpLoading: false,
  token: localStorage.getItem('@token')
}

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'user'
})

export const useUser = createHook(Store)

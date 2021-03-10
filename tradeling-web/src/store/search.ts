import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import axios from 'axios'

import { Repository, SearchType, User } from '../types'
import { AppDispatch } from '.'

const { REACT_APP_API_URI } = process.env

type State = {
  error?: string
  loading: boolean
  query?: string
  results: Record<string, Array<Repository | User>>
  type?: SearchType
}

const { actions, reducer } = createSlice<State, SliceCaseReducers<State>>({
  initialState: {
    loading: false,
    results: {}
  },
  name: 'search',
  reducers: {
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload
    },
    setResults: (
      state,
      {
        payload: { key, results }
      }: PayloadAction<{
        key: string
        results: Array<Repository | User>
      }>
    ) => {
      state.results[key] = results
    },
    setType: (state, { payload }: PayloadAction<SearchType>) => {
      state.type = payload
    }
  }
})

export const go = (query: string, type: SearchType) => async (
  dispatch: AppDispatch
): Promise<void> => {
  dispatch(actions.setLoading(true))

  try {
    const key = `${type}:${query}`

    const {
      data: { results }
    } = await axios.request({
      data: {
        query,
        type
      },
      method: 'post',
      url: `${REACT_APP_API_URI}/search`
    })

    dispatch(
      actions.setResults({
        key,
        results
      })
    )
  } catch (error) {
    dispatch(actions.setError(error.response?.data.error || error.message))
  } finally {
    dispatch(actions.setLoading(false))
  }
}

export { reducer as searchReducer }

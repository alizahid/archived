import { get, set } from 'immutable'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { img_blastwave, img_darklegacy, img_lfg } from '../assets'
import { comics } from '../lib'
import { ComicInterface } from '../types'

type State = {
  comics: ComicInterface[]
  pages: {
    [id: string]: {
      [number: number]: string
    }
  }
  total: {
    [id: string]: number
  }
}
type StoreApi = StoreActionApi<State>
type Actions = typeof actions

const initialState: State = {
  comics: [
    {
      id: 'blastwave',
      image: img_blastwave,
      name: 'Blastwave'
    },
    {
      id: 'darklegacy',
      image: img_darklegacy,
      name: 'Dark Legacy'
    },
    {
      id: 'lfg',
      image: img_lfg,
      name: 'Looking for Group'
    }
  ],
  pages: {},
  total: {}
}

const actions = {
  getPage: (id: string, number: number) => async ({
    getState,
    setState
  }: StoreApi) => {
    const { pages } = getState()

    if (get(pages, `${id}.${number}`)) {
      return
    }

    const page = await comics.getPage(id, number)

    setState({
      pages: set(getState().pages, `${id}.${number}`, page)
    })
  },
  getPages: (id: string) => async ({ getState, setState }: StoreApi) => {
    const { total } = getState()

    if (total[id]) {
      return
    }

    const totalPages = await comics.getPages(id)

    setState({
      total: {
        ...getState().total,
        [id]: totalPages
      }
    })
  },
  init: (state: State) => ({ setState }: StoreApi) => {
    setState(state)
  }
}

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'comics'
})

export const useComics = createHook(Store)

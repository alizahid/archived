import { parseISO } from 'date-fns'
import { Action, createHook, createStore } from 'react-sweet-state'

import { CountrySummary, CountrySummaryResponse } from '../types'

type State = {
  countries: CountrySummary[]
  loading: boolean
}
type Actions = typeof actions

const initialState: State = {
  countries: [],
  loading: false
}

const actions = {
  fetch: (): Action<State> => async ({ setState }) => {
    setState({
      loading: true
    })

    const response = await fetch('https://api.covid19api.com/summary')

    const {
      Countries
    }: {
      Countries: CountrySummaryResponse[]
    } = await response.json()

    const countries: CountrySummary[] = Countries.map(
      ({
        Country,
        CountryCode,
        Date,
        NewConfirmed,
        NewDeaths,
        NewRecovered,
        Slug,
        TotalConfirmed,
        TotalDeaths,
        TotalRecovered
      }) => ({
        cases: {
          new: NewConfirmed,
          total: TotalConfirmed
        },
        code: CountryCode,
        deaths: {
          new: NewDeaths,
          total: TotalDeaths
        },
        id: Slug,
        name: Country,
        recovered: {
          new: NewRecovered,
          total: TotalRecovered
        },
        updated: parseISO(Date)
      })
    )

    setState({
      countries,
      loading: false
    })
  }
}

const store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'summary'
})

export const useSummary = createHook(store)

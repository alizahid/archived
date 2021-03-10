import { formatRFC3339, parseISO, startOfDay } from 'date-fns'
import { createIntl } from 'react-intl'
import { Alert } from 'react-native'
import { Action, createHook, createStore } from 'react-sweet-state'

import { messages } from '../i18n'
import { CountryDetails, CountryDetailsResponse } from '../types'

type State = {
  data: CountryDetails[]
  loading: boolean
}
type Actions = typeof actions

const initialState: State = {
  data: [],
  loading: false
}

const actions = {
  fetch: (
    locale: string,
    slug: string,
    from: Date,
    to: Date
  ): Action<State> => async ({ setState }) => {
    setState({
      loading: true
    })

    try {
      const response = await fetch(
        `https://api.covid19api.com/country/${slug}?from=${formatRFC3339(
          startOfDay(from)
        )}&to=${formatRFC3339(startOfDay(to))}`
      )

      const json = await response.json()

      if (json.message) {
        throw new Error()
      }

      const data: CountryDetails[] = (json as CountryDetailsResponse[])
        .reverse()
        .map(({ Active, Confirmed, Date, Deaths, ID, Recovered }) => ({
          active: Active,
          confirmed: Confirmed,
          date: parseISO(Date),
          deaths: Deaths,
          id: ID,
          recovered: Recovered
        }))

      setState({
        data
      })
    } catch {
      const i18n = createIntl({
        locale,
        messages: messages[locale]
      })

      Alert.alert(
        i18n.formatMessage({
          id: 'common__error'
        }),
        i18n.formatMessage({
          id: 'hook__details__fetch__message'
        })
      )
    } finally {
      setState({
        loading: false
      })
    }
  }
}

const store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'details'
})

export const useDetails = createHook(store)

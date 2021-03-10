import React, { useEffect } from 'react'
import {
  NavigationScreenComponent,
  NavigationActions,
  StackActions
} from 'react-navigation'
import { useMutation, useQuery } from 'react-apollo-hooks'

import { Spinner } from '../components'
import { mutation, query } from '../data'

const Auth: NavigationScreenComponent = ({ navigation: { dispatch } }) => {
  const { data, loading } = useQuery(query.getAuth)

  const setAuth = useMutation(mutation.setAuth)

  const signUp = useMutation(mutation.signUp, {
    async update(proxy, data) {
      const {
        data: {
          signUp: { id, token }
        }
      } = data

      await setAuth({
        variables: {
          id,
          token
        }
      })

      redirect()
    }
  })

  const redirect = () => {
    const action = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'App'
        })
      ]
    })

    dispatch(action)
  }

  useEffect(() => {
    if (data.token) {
      redirect()
    } else if (!loading) {
      signUp()
    }
  }, [data])

  return <Spinner />
}

export default Auth

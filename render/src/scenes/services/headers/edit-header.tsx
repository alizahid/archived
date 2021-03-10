import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { set } from 'immutable'
import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { EditHeader, NavBar } from '../../../components'
import { IHeader, IMutationSaveHeadersArgs } from '../../../graphql/types'
import { helpers } from '../../../lib'
import { GET_HEADERS } from './headers'

export const UPDATE_HEADERS = gql`
  mutation saveHeaders($serviceId: String!, $headerInputs: [HeaderInput!]!) {
    saveHeaders(serviceId: $serviceId, headerInputs: $headerInputs) {
      __typename
    }
  }
`

interface Props {
  header: IHeader
  headers: IHeader[]
  serviceId: string
}

export const EditServiceHeader: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const header = getParam('header')
  const headers = getParam('headers')
  const serviceId = getParam('serviceId')

  const [updateHeaders, { loading }] = useMutation<
    {},
    IMutationSaveHeadersArgs
  >(UPDATE_HEADERS, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_HEADERS,
          variables: {
            serviceId
          }
        }
      ]
    }
  })

  return (
    <EditHeader
      header={header}
      loading={loading}
      onSave={(path, key, value) => {
        const index = headers.findIndex(({ id }) => id === header.id)

        updateHeaders({
          variables: {
            headerInputs: helpers
              .removeAllFields(
                set(headers, index, {
                  ...header,
                  key,
                  path,
                  value
                }),
                ['__typename', 'id']
              )
              .map(header => ({
                ...header,
                enabled: true
              })),
            serviceId
          }
        })
      }}
    />
  )
}

EditServiceHeader.navigationOptions = {
  header: () => <NavBar back title="Edit header" />
}

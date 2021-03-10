import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { EditHeader, NavBar } from '../../../components'
import { IMutationSaveHeadersArgs, IRedirectRule } from '../../../graphql/types'
import { helpers } from '../../../lib'
import { UPDATE_HEADERS } from './edit-header'
import { GET_HEADERS } from './headers'

interface Props {
  headers: IRedirectRule[]
  serviceId: string
}

export const AddServiceHeader: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, pop }
}) => {
  const headers = getParam('headers')
  const serviceId = getParam('serviceId')

  const [updateHeaders, { loading }] = useMutation<
    {},
    IMutationSaveHeadersArgs
  >(UPDATE_HEADERS, {
    awaitRefetchQueries: true,
    onCompleted() {
      pop()
    },
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
      loading={loading}
      onSave={(path, key, value) =>
        updateHeaders({
          variables: {
            headerInputs: helpers
              .removeAllFields(
                [
                  ...headers,
                  {
                    key,
                    path,
                    value
                  }
                ],
                ['__typename', 'id']
              )
              .map(header => ({
                ...header,
                enabled: true
              })),
            serviceId
          }
        })
      }
    />
  )
}

AddServiceHeader.navigationOptions = {
  header: () => <NavBar back title="Add header" />
}

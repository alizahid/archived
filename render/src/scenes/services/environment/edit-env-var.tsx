import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { EditEnvVar as EditForm, NavBar } from '../../../components'
import { IEnvVar, IMutationSaveEnvVarsArgs } from '../../../graphql/types'
import { helpers } from '../../../lib'
import { GET_SERVICE_ENV_VARS } from './environment'

export const UPDATE_SERVICE_ENV_VARS = gql`
  mutation saveEnvVars($serviceId: String!, $envVarInputs: [EnvVarInput!]!) {
    saveEnvVars(serviceId: $serviceId, envVarInputs: $envVarInputs) {
      __typename
    }
  }
`

interface Props {
  envVar: IEnvVar
  envVars: IEnvVar[]
  serviceId: string
}

export const EditServiceEnvVar: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const envVar = getParam('envVar')
  const envVars = getParam('envVars')
  const serviceId = getParam('serviceId')

  const [updateEnvVars, { loading }] = useMutation<
    {},
    IMutationSaveEnvVarsArgs
  >(UPDATE_SERVICE_ENV_VARS, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_SERVICE_ENV_VARS,
          variables: {
            isFile: false,
            serviceId
          }
        }
      ]
    }
  })

  return (
    <EditForm
      envVar={envVar}
      loading={loading}
      onSave={(key, value) =>
        updateEnvVars({
          variables: {
            envVarInputs: helpers.removeAllTypeName([
              ...envVars.filter(({ id }) => id !== envVar.id),
              {
                ...envVar,
                key,
                value
              }
            ]),
            serviceId
          }
        })
      }
    />
  )
}

EditServiceEnvVar.navigationOptions = {
  header: () => <NavBar back title="Edit env var" />
}

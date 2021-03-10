import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { EditEnvVar, NavBar } from '../../../components'
import { IEnvVar, IMutationSaveEnvVarsArgs } from '../../../graphql/types'
import { helpers } from '../../../lib'
import { UPDATE_SERVICE_ENV_VARS } from './edit-env-var'
import { GET_SERVICE_ENV_VARS } from './environment'

interface Props {
  envVars: IEnvVar[]
  serviceId: string
}

export const AddServiceEnvVar: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, pop }
}) => {
  const envVars = getParam('envVars')
  const serviceId = getParam('serviceId')

  const [updateEnvVars, { loading }] = useMutation<
    {},
    IMutationSaveEnvVarsArgs
  >(UPDATE_SERVICE_ENV_VARS, {
    awaitRefetchQueries: true,
    onCompleted() {
      pop()
    },
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
    <EditEnvVar
      hideFileSwitch
      loading={loading}
      onSave={(key, value) =>
        updateEnvVars({
          variables: {
            envVarInputs: helpers.removeAllTypeName([
              ...envVars,
              {
                id: '',
                isFile: false,
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

AddServiceEnvVar.navigationOptions = {
  header: () => <NavBar back title="Add env var" />
}

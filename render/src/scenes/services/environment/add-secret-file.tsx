import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { EditEnvVar, NavBar } from '../../../components'
import { IEnvVar, IMutationSaveEnvVarsArgs } from '../../../graphql/types'
import { helpers } from '../../../lib'
import { UPDATE_SERVICE_SECRET_FILES } from './edit-secret-file'
import { GET_SERVICE_ENV_VARS } from './environment'

interface Props {
  secretFiles: IEnvVar[]
  serviceId: string
}

export const AddServiceSecretFile: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, pop }
}) => {
  const secretFiles = getParam('secretFiles')
  const serviceId = getParam('serviceId')

  const [updateSecretFiles, { loading }] = useMutation<
    {},
    IMutationSaveEnvVarsArgs
  >(UPDATE_SERVICE_SECRET_FILES, {
    awaitRefetchQueries: true,
    onCompleted() {
      pop()
    },
    refetchQueries() {
      return [
        {
          query: GET_SERVICE_ENV_VARS,
          variables: {
            isFile: true,
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
        updateSecretFiles({
          variables: {
            envVarInputs: helpers.removeAllTypeName([
              ...secretFiles,
              {
                id: '',
                isFile: true,
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

AddServiceSecretFile.navigationOptions = {
  header: () => <NavBar back title="Add secret file" />
}

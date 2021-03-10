import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { EditEnvVar as EditForm, NavBar } from '../../../components'
import { IEnvVar, IMutationSaveEnvVarsArgs } from '../../../graphql/types'
import { helpers } from '../../../lib'
import { GET_SERVICE_ENV_VARS } from './environment'

export const UPDATE_SERVICE_SECRET_FILES = gql`
  mutation saveSecretFiles(
    $serviceId: String!
    $envVarInputs: [EnvVarInput!]!
  ) {
    saveSecretFiles(serviceId: $serviceId, fileInputs: $envVarInputs) {
      __typename
    }
  }
`

interface Props {
  secretFile: IEnvVar
  secretFiles: IEnvVar[]
  serviceId: string
}

export const EditServiceSecretFile: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const secretFile = getParam('secretFile')
  const secretFiles = getParam('secretFiles')
  const serviceId = getParam('serviceId')

  const [updateSecretFiles, { loading }] = useMutation<
    {},
    IMutationSaveEnvVarsArgs
  >(UPDATE_SERVICE_SECRET_FILES, {
    awaitRefetchQueries: true,
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
    <EditForm
      envVar={secretFile}
      loading={loading}
      onSave={(key, value) =>
        updateSecretFiles({
          variables: {
            envVarInputs: helpers.removeAllTypeName([
              ...secretFiles.filter(({ id }) => id !== secretFile.id),
              {
                ...secretFile,
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

EditServiceSecretFile.navigationOptions = {
  header: () => <NavBar back title="Edit secret file" />
}

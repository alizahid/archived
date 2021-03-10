import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { EditEnvVar as EditForm, NavBar } from '../../components'
import {
  IEnvGroup,
  IEnvVar,
  IMutationUpdateEnvGroupEnvVarsArgs
} from '../../graphql/types'
import { helpers } from '../../lib'
import { GET_ENV_GROUP } from './env-group'

export const UPDATE_ENV_VARS = gql`
  mutation updateEnvGroupEnvVars($id: String!, $envVarInputs: [EnvVarInput!]!) {
    updateEnvGroupEnvVars(id: $id, envVarInputs: $envVarInputs) {
      __typename
    }
  }
`

export const UPDATE_SECRET_FILES = gql`
  mutation updateEnvGroupSecretFiles(
    $id: String!
    $envVarInputs: [EnvVarInput!]!
  ) {
    updateEnvGroupSecretFiles(id: $id, fileInputs: $envVarInputs) {
      __typename
    }
  }
`

interface Props {
  envGroup: IEnvGroup
  envVar: IEnvVar
}

export const EditEnvVar: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const envGroup = getParam('envGroup')
  const envVar = getParam('envVar')

  const [updateEnvVars, updateEnvVarsMutation] = useMutation<
    {},
    IMutationUpdateEnvGroupEnvVarsArgs
  >(UPDATE_ENV_VARS, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_ENV_GROUP,
          variables: {
            id: envGroup.id
          }
        }
      ]
    }
  })

  const [updateSecretFiles, updateSecretFilesMutation] = useMutation<
    {},
    IMutationUpdateEnvGroupEnvVarsArgs
  >(UPDATE_SECRET_FILES, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_ENV_GROUP,
          variables: {
            id: envGroup.id
          }
        }
      ]
    }
  })

  const loading =
    updateEnvVarsMutation.loading || updateSecretFilesMutation.loading

  return (
    <EditForm
      envVar={envVar}
      loading={loading}
      onSave={(key, value) =>
        (envVar.isFile ? updateSecretFiles : updateEnvVars)({
          variables: {
            envVarInputs: helpers
              .removeAllTypeName([
                ...envGroup.envVars.filter(({ id }) => id !== envVar.id),
                {
                  ...envVar,
                  key,
                  value
                }
              ])
              .filter(({ isFile }) => isFile === envVar.isFile),
            id: envGroup.id
          }
        })
      }
    />
  )
}

EditEnvVar.navigationOptions = ({ navigation: { getParam } }) => ({
  header: () => (
    <NavBar
      back
      title={getParam('envVar').isFile ? 'Edit secret file' : 'Edit env var'}
    />
  )
})

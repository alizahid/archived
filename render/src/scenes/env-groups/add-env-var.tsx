import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { EditEnvVar, NavBar } from '../../components'
import {
  IEnvGroup,
  IMutationUpdateEnvGroupEnvVarsArgs
} from '../../graphql/types'
import { helpers } from '../../lib'
import { UPDATE_ENV_VARS, UPDATE_SECRET_FILES } from './edit-env-var'
import { GET_ENV_GROUP } from './env-group'

interface Props {
  envGroup: IEnvGroup
}

export const AddEnvVar: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, pop }
}) => {
  const envGroup = getParam('envGroup')

  const [updateEnvVars, updateEnvVarsMutation] = useMutation<
    {},
    IMutationUpdateEnvGroupEnvVarsArgs
  >(UPDATE_ENV_VARS, {
    awaitRefetchQueries: true,
    onCompleted() {
      pop()
    },
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
    onCompleted() {
      pop()
    },
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
    <EditEnvVar
      loading={loading}
      onSave={(key, value, isFile) =>
        (isFile ? updateSecretFiles : updateEnvVars)({
          variables: {
            envVarInputs: helpers
              .removeAllTypeName([
                ...envGroup.envVars,
                {
                  id: '',
                  isFile,
                  key,
                  value
                }
              ])
              .filter(envVar => envVar.isFile === isFile),
            id: envGroup.id
          }
        })
      }
    />
  )
}

AddEnvVar.navigationOptions = {
  header: () => <NavBar back title="Add env var" />
}

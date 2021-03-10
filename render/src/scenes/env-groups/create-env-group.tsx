import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { layout } from '../../assets'
import { Button, NavBar, TextBox } from '../../components'
import { IEnvGroup, IMutationCreateEnvGroupArgs } from '../../graphql/types'
import { useAuth } from '../../store'
import { GET_ENV_GROUPS } from './env-groups'

export const CREATE_ENV_GROUP = gql`
  mutation createEnvGroup(
    $name: String!
    $envVarInputs: [EnvVarInput!]!
    $ownerId: String!
  ) {
    createEnvGroup(
      name: $name
      envVarInputs: $envVarInputs
      ownerId: $ownerId
    ) {
      ...envGroupFields
      __typename
    }
  }

  fragment envGroupFields on EnvGroup {
    id
    name
    updatedAt
    envVars {
      ...envVarFields
      __typename
    }
    __typename
  }

  fragment envVarFields on EnvVar {
    id
    isFile
    key
    value
    __typename
  }
`

export const CreateEnvGroup: NavigationStackScreenComponent = ({
  navigation: { replace }
}) => {
  const [{ userId }] = useAuth()

  const [name, setName] = useState('')

  const [createEnvGroup, { loading }] = useMutation<
    {
      createEnvGroup: IEnvGroup
    },
    IMutationCreateEnvGroupArgs
  >(CREATE_ENV_GROUP, {
    awaitRefetchQueries: true,
    onCompleted({ createEnvGroup }) {
      replace('EnvGroup', {
        envGroup: createEnvGroup
      })
    },
    refetchQueries() {
      return [
        {
          query: GET_ENV_GROUPS,
          variables: {
            ownerId: userId
          }
        }
      ]
    }
  })

  const go = () => {
    if (name && userId) {
      createEnvGroup({
        variables: {
          envVarInputs: [],
          name,
          ownerId: userId
        }
      })
    }
  }

  return (
    <View style={styles.main}>
      <TextBox
        onChangeText={name => setName(name)}
        onSubmitEditing={go}
        placeholder="Env group name"
        returnKeyType="go"
        value={name}
      />
      <Button
        style={styles.button}
        label="Create"
        loading={loading}
        onPress={go}
      />
    </View>
  )
}

CreateEnvGroup.navigationOptions = {
  header: () => <NavBar back title="Create env group" />
}

const styles = StyleSheet.create({
  button: {
    marginTop: layout.margin
  },
  main: {
    flex: 1,
    padding: layout.margin
  }
})

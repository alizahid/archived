import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { colors, fonts, layout, weights } from '../../assets'
import {
  Button,
  DatabasePlan,
  DatabasePlans,
  NavBar,
  TextBox,
  Touchable
} from '../../components'
import {
  IDatabase,
  IDatabaseType,
  IMutationCreateDatabaseArgs,
  IPlanData
} from '../../graphql/types'
import { useAuth } from '../../store'
import { GET_DATABASES } from './databases'

export const CREATE_DATABASE = gql`
  mutation createDatabase($database: DatabaseInput!) {
    createDatabase(database: $database) {
      ...databaseFields
      __typename
    }
  }

  fragment databaseFields on Database {
    id
    name
    __typename
  }
`

export const CreateDatabase: NavigationStackScreenComponent = ({
  navigation: { replace }
}) => {
  const [{ userId }] = useAuth()

  const refDatabase = useRef<TextInput>(null)
  const refUser = useRef<TextInput>(null)

  const [plan, setPlan] = useState<IPlanData>()
  const [name, setName] = useState('')
  const [database, setDatabase] = useState('')
  const [user, setUser] = useState('')

  const [createDatabase, { loading }] = useMutation<
    {
      createDatabase: IDatabase
    },
    IMutationCreateDatabaseArgs
  >(CREATE_DATABASE, {
    awaitRefetchQueries: true,
    onCompleted({ createDatabase }) {
      replace('Database', {
        database: createDatabase
      })
    },
    refetchQueries() {
      return [
        {
          query: GET_DATABASES,
          variables: {
            ownerId: userId
          }
        }
      ]
    },
    variables: {
      database: {
        databaseName: database,
        databaseUser: user,
        name,
        ownerId: userId as string,
        plan: plan?.name,
        type: IDatabaseType.Postgresql,
        version: '10.x'
      }
    }
  })

  if (!plan) {
    return <DatabasePlans onChange={plan => setPlan(plan)} />
  }

  const go = () => {
    if (plan && name) {
      createDatabase()
    }
  }

  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="always">
      <DatabasePlan plan={plan} />
      <TextBox
        style={styles.item}
        onChangeText={name => setName(name)}
        onSubmitEditing={() => refDatabase.current?.focus()}
        placeholder="Name"
        returnKeyType="next"
        value={name}
      />
      <TextBox
        ref={refDatabase}
        style={styles.item}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={database => setDatabase(database)}
        onSubmitEditing={() => refUser.current?.focus()}
        placeholder="Database"
        returnKeyType="next"
        value={database}
      />
      <TextBox
        ref={refUser}
        style={styles.item}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={user => setUser(user)}
        onSubmitEditing={go}
        placeholder="User"
        returnKeyType="go"
        value={user}
      />
      <Button
        style={styles.item}
        label="Create"
        loading={loading}
        onPress={go}
      />
      <Touchable style={styles.changePlan} onPress={() => setPlan(undefined)}>
        <Text style={styles.changePlanLabel}>Change plan</Text>
      </Touchable>
    </ScrollView>
  )
}

CreateDatabase.navigationOptions = {
  header: () => <NavBar back title="Create database" />
}

const styles = StyleSheet.create({
  changePlan: {
    alignItems: 'center',
    height: layout.button.height,
    justifyContent: 'center',
    marginTop: layout.margin
  },
  changePlanLabel: {
    ...fonts.regular,
    ...weights.medium,
    color: colors.state.warning
  },
  content: {
    padding: layout.margin
  },
  item: {
    marginTop: layout.margin
  },
  main: {
    flex: 1
  }
})

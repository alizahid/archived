import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { orderBy } from 'lodash'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_dark_add } from '../../assets'
import {
  Database,
  EmptyDatabase,
  ListActions,
  NavBar,
  Refresher,
  Separator,
  Spinner
} from '../../components'
import {
  IDatabase,
  IMutationDeleteDatabaseArgs,
  IQueryDatabasesForOwnerArgs
} from '../../graphql/types'
import { dialog } from '../../lib'
import { useAuth } from '../../store'

export const GET_DATABASES = gql`
  query databasesForOwner($ownerId: String!) {
    databasesForOwner(ownerId: $ownerId) {
      id
      name
      type
      status
      __typename
    }
  }
`

export const REMOVE_DATABASE = gql`
  mutation deleteDatabase($id: String!) {
    deleteDatabase(id: $id)
  }
`

export const Databases: NavigationStackScreenComponent = ({
  navigation: { navigate }
}) => {
  const [{ userId }] = useAuth()

  const { data, loading, refetch } = useQuery<
    {
      databasesForOwner: IDatabase[]
    },
    IQueryDatabasesForOwnerArgs
  >(GET_DATABASES, {
    variables: {
      ownerId: userId as string
    }
  })

  const [removeDatabase, removeDatabaseMutation] = useMutation<
    {},
    IMutationDeleteDatabaseArgs
  >(REMOVE_DATABASE, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_DATABASES,
          variables: {
            ownerId: userId as string
          }
        }
      ]
    }
  })

  return (
    <SwipeListView
      contentContainerStyle={styles.content}
      data={orderBy(data?.databasesForOwner, 'createdAt', 'desc')}
      disableRightSwipe
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={() => {
        if (loading) {
          return <Spinner />
        }

        return <EmptyDatabase onPress={() => navigate('CreateDatabase')} />
      }}
      refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
      renderHiddenItem={({ item }) => (
        <ListActions
          loading={removeDatabaseMutation.loading}
          onDelete={async () => {
            const yes = await dialog.confirm(
              'Delete database',
              'Are you sure you want to delete this database?'
            )

            if (yes) {
              removeDatabase({
                variables: {
                  id: item.id
                }
              })
            }
          }}
        />
      )}
      renderItem={({ item }) => (
        <Database
          database={item}
          onPress={() =>
            navigate('Database', {
              database: item
            })
          }
        />
      )}
      rightOpenValue={-60}
    />
  )
}

Databases.navigationOptions = ({ navigation: { navigate } }) => ({
  header: () => (
    <NavBar
      action={{
        icon: img_dark_add,
        onPress: () => navigate('CreateDatabase')
      }}
      title="Databases"
    />
  )
})

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  }
})

import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { orderBy } from 'lodash'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_dark_add } from '../../assets'
import {
  EmptyEnvGroup,
  EnvGroup,
  ListActions,
  NavBar,
  Refresher,
  Separator,
  Spinner
} from '../../components'
import {
  IEnvGroup,
  IMutationDeleteEnvGroupArgs,
  IQueryEnvGroupsForOwnerArgs
} from '../../graphql/types'
import { dialog } from '../../lib'
import { useAuth } from '../../store'

export const GET_ENV_GROUPS = gql`
  query envGroupsForOwner($ownerId: String!) {
    envGroupsForOwner(ownerId: $ownerId) {
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

export const REMOVE_ENV_GROUP = gql`
  mutation deleteEnvGroup($id: String!) {
    deleteEnvGroup(id: $id)
  }
`

export const EnvGroups: NavigationStackScreenComponent = ({
  navigation: { navigate }
}) => {
  const [{ userId }] = useAuth()

  const { data, loading, refetch } = useQuery<
    {
      envGroupsForOwner: IEnvGroup[]
    },
    IQueryEnvGroupsForOwnerArgs
  >(GET_ENV_GROUPS, {
    variables: {
      ownerId: userId as string
    }
  })

  const [removeEnvGroup, removeEnvGroupMutation] = useMutation<
    {},
    IMutationDeleteEnvGroupArgs
  >(REMOVE_ENV_GROUP, {
    awaitRefetchQueries: true,
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

  return (
    <SwipeListView
      contentContainerStyle={styles.content}
      data={orderBy(data?.envGroupsForOwner, 'updatedAt', 'desc')}
      disableRightSwipe
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={() => {
        if (loading) {
          return <Spinner />
        }

        return <EmptyEnvGroup onPress={() => navigate('CreateEnvGroup')} />
      }}
      refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
      renderHiddenItem={({ item }) => (
        <ListActions
          loading={removeEnvGroupMutation.loading}
          onDelete={async () => {
            const yes = await dialog.confirm(
              'Delete env group',
              'Are you sure you want to delete this env group?'
            )

            if (yes) {
              removeEnvGroup({
                variables: {
                  id: item.id
                }
              })
            }
          }}
        />
      )}
      renderItem={({ item }) => (
        <EnvGroup
          envGroup={item}
          onPress={() =>
            navigate('EnvGroup', {
              envGroup: item
            })
          }
        />
      )}
      rightOpenValue={-60}
    />
  )
}

EnvGroups.navigationOptions = ({ navigation: { navigate } }) => ({
  header: () => (
    <NavBar
      action={{
        icon: img_dark_add,
        onPress: () => navigate('CreateEnvGroup')
      }}
      title="Env groups"
    />
  )
})

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  }
})

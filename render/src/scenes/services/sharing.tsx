import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { colors, fonts, layout } from '../../assets'
import {
  ListActions,
  NavBar,
  Refresher,
  Separator,
  ServiceCollaborator,
  ServiceInviteCollaborator,
  Spinner
} from '../../components'
import {
  ICronJob,
  IMutationInviteAndShareArgs,
  IMutationRevokeAllPermissionsArgs,
  IQueryHeadersForServiceArgs,
  IServer,
  IService
} from '../../graphql/types'
import { dialog } from '../../lib'
import { IServiceCollaborator } from '../../store/types'

export const GET_SHARING = gql`
  query permissionsGrantedForService($serviceId: String!) {
    service(id: $serviceId) {
      id
      user {
        id
        email
        __typename
      }
      referentPermissions {
        subject {
          __typename
          ... on User {
            id
            email
            __typename
          }
        }
        __typename
      }
      pendingPermissions {
        email
        __typename
      }
      __typename
    }
  }
`

export const INVITE_USER = gql`
  mutation inviteAndShare(
    $email: String!
    $action: String!
    $serviceId: String!
  ) {
    inviteAndShare(email: $email, action: $action, serviceId: $serviceId) {
      email
      action
      __typename
    }
  }
`

export const REMOVE_USER = gql`
  mutation revokeAllPermissions($subjectId: String!, $objectId: String!) {
    revokeAllPermissions(subjectId: $subjectId, objectId: $objectId)
  }
`

interface Props {
  service: ICronJob | IServer
}

export const ServiceSharing: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const { id } = getParam('service')

  const { data, loading, refetch } = useQuery<
    {
      service: IService
    },
    IQueryHeadersForServiceArgs
  >(GET_SHARING, {
    variables: {
      serviceId: id
    }
  })

  const [inviteUser, inviteUserMutation] = useMutation<
    {},
    IMutationInviteAndShareArgs
  >(INVITE_USER, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_SHARING,
          variables: {
            serviceId: id
          }
        }
      ]
    }
  })

  const [removeUser, removeUserMutation] = useMutation<
    {},
    IMutationRevokeAllPermissionsArgs
  >(REMOVE_USER, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_SHARING,
          variables: {
            serviceId: id
          }
        }
      ]
    }
  })

  if (loading || !data) {
    return <Spinner />
  }

  const users: IServiceCollaborator[] = [
    ...data.service.referentPermissions.map(({ subject }) => subject),
    ...data.service.pendingPermissions.map(user => ({
      ...user,
      pending: true
    }))
  ]

  return (
    <SwipeListView
      data={users}
      disableRightSwipe
      ItemSeparatorComponent={Separator}
      keyboardShouldPersistTaps="always"
      keyExtractor={({ email }) => email}
      ListEmptyComponent={
        <Text style={styles.empty}>No collaborators found</Text>
      }
      ListFooterComponent={
        <>
          <Text style={styles.title}>Invite</Text>
          <ServiceInviteCollaborator
            loading={inviteUserMutation.loading}
            onInvite={email =>
              inviteUser({
                variables: {
                  action: 'all',
                  email,
                  serviceId: id
                }
              })
            }
          />
        </>
      }
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Owner</Text>
          <ServiceCollaborator
            collaborator={{
              ...data.service.user,
              role: 'owner'
            }}
          />
          <Text style={styles.title}>Collaborators</Text>
        </>
      }
      refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
      renderHiddenItem={({ item }) => (
        <ListActions
          loading={removeUserMutation.loading}
          onDelete={async () => {
            const yes = await dialog.confirm(
              'Remove user',
              'Are you sure you want to remove this user?'
            )

            if (yes) {
              removeUser({
                variables: {
                  objectId: id,
                  subjectId: item.id || item.email
                }
              })
            }
          }}
        />
      )}
      renderItem={({ item }) => <ServiceCollaborator collaborator={item} />}
      rightOpenValue={-60}
    />
  )
}

ServiceSharing.navigationOptions = {
  header: () => <NavBar back title="Sharing" />
}

const styles = StyleSheet.create({
  empty: {
    ...fonts.regular,
    margin: layout.margin
  },
  title: {
    ...fonts.subtitle,
    backgroundColor: colors.backgroundDark,
    padding: layout.margin
  }
})

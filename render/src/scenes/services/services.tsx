import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { orderBy } from 'lodash'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import {
  colors,
  img_dark_add,
  img_light_resume,
  img_light_suspend
} from '../../assets'
import {
  EmptyService,
  ListActions,
  NavBar,
  Refresher,
  Separator,
  Service,
  Spinner
} from '../../components'
import {
  IMutationDeleteCronJobArgs,
  IMutationDeleteServerArgs,
  IMutationResumeService1Args,
  IMutationSuspendService1Args,
  IQueryServicesForOwnerArgs,
  IService
} from '../../graphql/types'
import { dialog } from '../../lib'
import { useAuth } from '../../store'

export const GET_SERVICES = gql`
  query servicesForOwner($ownerId: String!) {
    servicesForOwner(ownerId: $ownerId) {
      id
      type
      userFacingType
      userFacingTypeSlug
      name
      env {
        ...envFields
        __typename
      }
      repo {
        ...repoFields
        __typename
      }
      updatedAt
      state
      __typename
    }
  }

  fragment envFields on Env {
    name
    isStatic
    __typename
  }

  fragment repoFields on Repo {
    provider
    name
    ownerName
    __typename
  }
`

export const REMOVE_SERVER = gql`
  mutation deleteServer($id: String!) {
    deleteServer(id: $id)
  }
`

export const REMOVE_CRON_JOB = gql`
  mutation deleteCronJob($id: String!) {
    deleteCronJob(id: $id)
  }
`

export const SUSPEND_SERVICE = gql`
  mutation suspendService($id: String!) {
    suspendService1(id: $id) {
      id
    }
  }
`

export const RESUME_SERVICE = gql`
  mutation resumeService($id: String!) {
    resumeService1(id: $id) {
      id
    }
  }
`

export const Services: NavigationStackScreenComponent = ({
  navigation: { navigate }
}) => {
  const [{ userId }] = useAuth()

  const { data, loading, refetch } = useQuery<
    {
      servicesForOwner: IService[]
    },
    IQueryServicesForOwnerArgs
  >(GET_SERVICES, {
    variables: {
      ownerId: userId as string
    }
  })

  const refetchQueries = [
    {
      query: GET_SERVICES,
      variables: {
        ownerId: userId
      }
    }
  ]

  const [suspendService, suspendServiceMutation] = useMutation<
    {},
    IMutationSuspendService1Args
  >(SUSPEND_SERVICE, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return refetchQueries
    }
  })

  const [resumeService, resumeServiceMutation] = useMutation<
    {},
    IMutationResumeService1Args
  >(RESUME_SERVICE, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return refetchQueries
    }
  })

  const [removeServer, removeServerMutation] = useMutation<
    {},
    IMutationDeleteServerArgs
  >(REMOVE_SERVER, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return refetchQueries
    }
  })

  const [removeCronJob, removeCronJobMutation] = useMutation<
    {},
    IMutationDeleteCronJobArgs
  >(REMOVE_CRON_JOB, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return refetchQueries
    }
  })

  return (
    <SwipeListView
      contentContainerStyle={styles.content}
      data={orderBy(data?.servicesForOwner, 'updatedAt', 'desc')}
      disableRightSwipe
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={() => {
        if (loading) {
          return <Spinner />
        }

        return <EmptyService onPress={() => navigate('CreateService')} />
      }}
      refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
      renderHiddenItem={({ item }) => (
        <ListActions
          action={{
            color:
              item.state === 'Suspended'
                ? colors.state.success
                : colors.state.warning,
            icon:
              item.state === 'Suspended' ? img_light_resume : img_light_suspend,
            loading:
              suspendServiceMutation.loading || resumeServiceMutation.loading,
            onPress: async () => {
              const suspended = item.state === 'Suspended'

              const yes = await dialog.confirm(
                `${suspended ? 'Resume' : 'Suspend'} service`,
                `Are you sure you want to ${
                  suspended ? 'resume' : 'suspend'
                } this service?`
              )

              if (yes) {
                if (suspended) {
                  resumeService({
                    variables: {
                      id: item.id
                    }
                  })
                } else {
                  suspendService({
                    variables: {
                      id: item.id
                    }
                  })
                }
              }
            }
          }}
          loading={
            removeServerMutation.loading || removeCronJobMutation.loading
          }
          onDelete={async () => {
            const yes = await dialog.confirm(
              'Delete service',
              'Are you sure you want to delete this service?'
            )

            if (yes) {
              if (item.type === 'cron') {
                removeCronJob({
                  variables: {
                    id: item.id
                  }
                })
              } else if (item.type === 'server') {
                removeServer({
                  variables: {
                    id: item.id
                  }
                })
              }
            }
          }}
        />
      )}
      renderItem={({ item }) => (
        <Service
          service={item}
          onPress={() => {
            if (item.type === 'cron') {
              navigate('CronJob', {
                cronJob: item
              })
            } else if (item.type === 'server') {
              navigate('Server', {
                server: item
              })
            }
          }}
        />
      )}
      rightOpenValue={-120}
    />
  )
}

Services.navigationOptions = {
  header: () => (
    <NavBar
      action={{
        icon: img_dark_add,
        onPress: () => dialog.notAvailable('Create service')
      }}
      title="Services"
    />
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  }
})

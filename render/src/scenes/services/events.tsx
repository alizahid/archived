import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import {
  Empty,
  NavBar,
  Refresher,
  Separator,
  ServiceEvent
} from '../../components'
import {
  ICronJob,
  IQueryServiceEventsArgs,
  IServer,
  IServiceEventsResult
} from '../../graphql/types'

export const GET_SERVICE_EVENTS = gql`
  query serviceEvents($serviceId: String!, $before: Time, $limit: Int) {
    serviceEvents(serviceId: $serviceId, before: $before, limit: $limit) {
      hasMore
      events {
        ...allServiceEvents
        __typename
      }
      __typename
    }
  }

  fragment allServiceEvents on ServiceEvent {
    ...serviceEventFields
    ...buildEndedFields
    ...buildStartedFields
    ...cronJobRunEndedFields
    ...cronJobRunStartedFields
    ...deployEndedFields
    ...deployStartedFields
    ...serverFailedFields
    ...suspenderAddedFields
    ...suspenderRemovedFields
    ...planChangedFields
    ...extraInstancesChangedFields
    ...branchDeletedFields
    __typename
  }

  fragment serviceEventFields on ServiceEvent {
    id
    timestamp
    __typename
  }

  fragment buildEndedFields on BuildEnded {
    buildId
    build {
      id
      commitShortId
      commitMessage
      commitURL
      __typename
    }
    status
    reason {
      ...buildDeployEndReasonFields
      __typename
    }
    __typename
  }

  fragment buildDeployEndReasonFields on BuildDeployEndReason {
    buildFailed {
      id
      __typename
    }
    newBuild {
      id
      __typename
    }
    newDeploy {
      id
      __typename
    }
    failure {
      ...failureReasonFields
      __typename
    }
    timedOutSeconds
    __typename
  }

  fragment failureReasonFields on FailureReason {
    evicted
    nonZeroExit
    oomKilled {
      memoryRequest
      memoryLimit
      __typename
    }
    timedOutSeconds
    __typename
  }

  fragment buildStartedFields on BuildStarted {
    buildId
    build {
      id
      commitShortId
      commitMessage
      commitURL
      __typename
    }
    trigger {
      ...buildDeployTriggerFields
      __typename
    }
    __typename
  }

  fragment buildDeployTriggerFields on BuildDeployTrigger {
    firstBuild
    clusterSynced
    envUpdated
    manual
    user {
      id
      email
      __typename
    }
    updatedProperty
    newCommit
    system
    __typename
  }

  fragment cronJobRunEndedFields on CronJobRunEnded {
    cronJobRunId
    cronJobRun {
      id
      status
      __typename
    }
    status
    newRun {
      id
      __typename
    }
    reason {
      ...failureReasonFields
      __typename
    }
    user {
      id
      email
      __typename
    }
    __typename
  }

  fragment cronJobRunStartedFields on CronJobRunStarted {
    cronJobRunId
    cronJobRun {
      id
      status
      __typename
    }
    triggeredByUser {
      id
      email
      __typename
    }
    __typename
  }

  fragment deployEndedFields on DeployEnded {
    deployId
    deploy {
      id
      status
      commitShortId
      commitMessage
      commitURL
      __typename
    }
    status
    reason {
      ...buildDeployEndReasonFields
      __typename
    }
    __typename
  }

  fragment deployStartedFields on DeployStarted {
    deployId
    deploy {
      id
      status
      commitShortId
      commitMessage
      commitURL
      __typename
    }
    trigger {
      ...buildDeployTriggerFields
      __typename
    }
    __typename
  }

  fragment serverFailedFields on ServerFailed {
    reason {
      ...failureReasonFields
      __typename
    }
    __typename
  }

  fragment suspenderAddedFields on SuspenderAdded {
    actor
    suspendedByUser {
      id
      email
      __typename
    }
    __typename
  }

  fragment suspenderRemovedFields on SuspenderRemoved {
    actor
    resumedByUser {
      id
      email
      __typename
    }
    __typename
  }

  fragment planChangedFields on PlanChanged {
    from
    to
    __typename
  }

  fragment extraInstancesChangedFields on ExtraInstancesChanged {
    fromInstances
    toInstances
    __typename
  }

  fragment branchDeletedFields on BranchDeleted {
    deletedBranch
    newBranch
    __typename
  }
`

interface Props {
  service: ICronJob | IServer
}

export const ServiceEvents: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const { id } = getParam('service')

  const { data, loading, refetch } = useQuery<
    {
      serviceEvents: IServiceEventsResult
    },
    IQueryServiceEventsArgs
  >(GET_SERVICE_EVENTS, {
    variables: {
      serviceId: id
    }
  })

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={data?.serviceEvents.events}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={<Empty message="No events found" />}
      refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
      renderItem={({ item }) => <ServiceEvent event={item} />}
    />
  )
}

ServiceEvents.navigationOptions = {
  header: () => <NavBar back title="Events" />
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  }
})

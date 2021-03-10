import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { orderBy } from 'lodash'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { colors } from '../../assets'
import { Empty, NavBar, Refresher, ServiceLog } from '../../components'
import {
  ICronJob,
  ILogEntry,
  IQueryServiceLogsArgs,
  IServer
} from '../../graphql/types'

export const GET_SERVICE_LOGS = gql`
  query serviceLogs($serviceId: String!) {
    serviceLogs(serviceId: $serviceId) {
      ...logEntryFields
      __typename
    }
  }

  fragment logEntryFields on LogEntry {
    id
    timestamp
    text
    __typename
  }
`

interface Props {
  service: ICronJob | IServer
}

export const ServiceLogs: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const { id } = getParam('service')

  const { data, loading, refetch } = useQuery<
    {
      serviceLogs: ILogEntry[]
    },
    IQueryServiceLogsArgs
  >(GET_SERVICE_LOGS, {
    variables: {
      serviceId: id
    }
  })

  return (
    <FlatList
      style={styles.main}
      contentContainerStyle={styles.content}
      data={orderBy(data?.serviceLogs, 'timestamp', 'desc')}
      inverted
      ListEmptyComponent={
        <Empty styleLabel={styles.emptyLabel} message="No logs found" />
      }
      refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
      renderItem={({ item }) => <ServiceLog log={item} />}
    />
  )
}

ServiceLogs.navigationOptions = {
  header: () => <NavBar back title="Logs" />
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  },
  emptyLabel: {
    color: colors.background
  },
  main: {
    backgroundColor: colors.foreground
  }
})

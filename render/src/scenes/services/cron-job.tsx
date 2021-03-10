import { sortBy } from 'lodash'
import React from 'react'
import { FlatList, Image, StyleSheet, Text } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import {
  fonts,
  img_service_disks,
  img_service_environment,
  img_service_events,
  img_service_logs,
  img_service_metrics,
  img_service_settings,
  img_service_sharing,
  layout,
  weights
} from '../../assets'
import { NavBar, Separator, Touchable } from '../../components'
import { ICronJob } from '../../graphql/types'

interface Props {
  cronJob: ICronJob
}

export const CronJob: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, navigate }
}) => {
  const cronJob = getParam('cronJob')

  const items = [
    {
      icon: img_service_events,
      id: 1,
      label: 'Events',
      onPress: () =>
        navigate('ServiceEvents', {
          service: cronJob
        })
    },
    {
      icon: img_service_logs,
      id: 2,
      label: 'Logs',
      onPress: () =>
        navigate('ServiceLogs', {
          service: cronJob
        })
    },
    {
      icon: img_service_disks,
      id: 3,
      label: 'Disks',
      onPress: () =>
        navigate('ServiceDisks', {
          service: cronJob
        })
    },
    {
      icon: img_service_environment,
      id: 4,
      label: 'Environment',
      onPress: () =>
        navigate('ServiceEnvironment', {
          service: cronJob
        })
    },
    {
      icon: img_service_sharing,
      id: 5,
      label: 'Sharing',
      onPress: () =>
        navigate('ServiceSharing', {
          service: cronJob
        })
    },
    {
      icon: img_service_metrics,
      id: 6,
      label: 'Metrics',
      onPress: () =>
        navigate('ServiceMetrics', {
          service: cronJob
        })
    },
    {
      icon: img_service_settings,
      id: 7,
      label: 'Settings',
      onPress: () =>
        navigate('ServiceSettings', {
          service: cronJob
        })
    }
  ]

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={sortBy(items, 'id')}
      ItemSeparatorComponent={Separator}
      keyExtractor={({ id }) => String(id)}
      renderItem={({ item }) => (
        <Touchable style={styles.item} onPress={() => item.onPress()}>
          <Image style={styles.icon} source={item.icon} />
          <Text style={styles.label}>{item.label}</Text>
        </Touchable>
      )}
    />
  )
}

CronJob.navigationOptions = ({ navigation: { getParam } }) => ({
  header: () => <NavBar back title={getParam('cronJob').name} />
})

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  },
  icon: {
    ...layout.icon,
    marginRight: layout.margin
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  label: {
    ...fonts.regular,
    ...weights.medium,
    flex: 1
  }
})

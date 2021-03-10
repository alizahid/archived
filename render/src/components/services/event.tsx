import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout, serviceEvents } from '../../assets'
import { IServiceEvent } from '../../graphql/types'
import { render } from '../../lib'
import { useAuth } from '../../store'

interface Props {
  event: IServiceEvent
}

export const ServiceEvent: FunctionComponent<Props> = ({ event }) => {
  const [{ email }] = useAuth()

  const getIcon = () => {
    const { __typename, status, triggeredByUser } = event

    switch (__typename) {
      case 'BuildEnded':
        if (status === 2) {
          return serviceEvents.build.succeeded
        }

        if (status === 3) {
          return serviceEvents.build.failed
        }

        if (status === 4) {
          return serviceEvents.build.cancelled
        }

        return serviceEvents.default

      case 'BuildStarted':
        return serviceEvents.build.started

      case 'CronJobRunEnded':
        if (status === 1) {
          return serviceEvents.cronJob.succeeded
        }

        if ([2, 3].includes(status)) {
          return serviceEvents.cronJob.cancelled
        }

        return serviceEvents.default

      case 'CronJobRunStarted':
        if (triggeredByUser) {
          return serviceEvents.cronJob.triggered
        }

        return serviceEvents.cronJob.started

      case 'DeployEnded':
        if (status === 2) {
          return serviceEvents.deployment.succeeded
        }

        if ([3, 4].includes(status)) {
          return serviceEvents.deployment.failed
        }

        if (status === 4) {
          return serviceEvents.deployment.cancelled
        }

        return serviceEvents.default

      case 'DeployStarted':
        return serviceEvents.deployment.started

      case 'ServerAvailable':
        return serviceEvents.server.available

      case 'ServerFailed':
        return serviceEvents.server.failed

      case 'SuspenderAdded':
      case 'ServiceSuspended':
        return serviceEvents.service.suspended

      case 'SuspenderRemoved':
      case 'ServiceResumed':
        return serviceEvents.service.resumed

      case 'DiskEvent':
      case 'PlanChanged':
      case 'ExtraInstancesChanged':
        return serviceEvents.info

      default:
        return serviceEvents.default
    }
  }

  const getCopy = () => {
    const {
      __typename,
      actor,
      build,
      deploy,
      from,
      fromInstances,
      resumedByUser,
      status,
      suspendedByUser,
      to,
      toInstances,
      triggeredByUser
    } = event

    switch (__typename) {
      case 'BuildEnded':
        return `Build ${render.getBuildStatus(status)} for ${
          build.commitShortId
        }: ${build.commitMessage}`

      case 'BuildStarted':
        return `Build started for ${build.commitShortId}: ${build.commitMessage}`

      case 'CronJobRunEnded':
        return `Cron job ${render.getCronJobStatus(status)}`

      case 'CronJobRunStarted':
        return `Cron job started ${triggeredByUser ? 'by you' : ''}`

      case 'DeployEnded':
        return `Deployment ${render.getDeployStatus(status)} for ${
          deploy.commitShortId
        }: ${deploy.commitMessage}`

      case 'DeployStarted':
        return `Deployment started for ${deploy.commitShortId}: ${deploy.commitMessage}`

      case 'DiskEvent':
        return 'Disk event'

      case 'ServerAvailable':
        return 'Server back up'

      case 'ServerFailed':
        return 'Server failed'

      case 'SuspenderAdded':
        return `Suspended by ${
          actor === 'User' && suspendedByUser.email === email
            ? 'you'
            : suspendedByUser.email
        }`

      case 'SuspenderRemoved':
        return `Resumed by ${
          actor === 'User' && resumedByUser.email === email
            ? 'you'
            : resumedByUser.email
        }`

      case 'ServiceSuspended':
        return 'Service suspended'

      case 'ServiceResumed':
        return 'Service resumed'

      case 'PlanChanged':
        return `Plan changed from ${from} to ${to}`

      case 'ExtraInstancesChanged':
        return `Extra instances changed from ${fromInstances} to ${toInstances}`
    }
  }

  const getReason = () => {
    const {
      reason: { nonZeroExit, oomKilled, timedOutSeconds }
    } = event

    if (nonZeroExit) {
      return <Text style={styles.reason}>Exited with status {nonZeroExit}</Text>
    }

    if (oomKilled) {
      return <Text style={styles.reason}>Out of memory</Text>
    }

    if (timedOutSeconds) {
      return <Text style={styles.reason}>Timed out</Text>
    }

    return null
  }

  return (
    <View style={styles.main}>
      <Image style={styles.icon} source={getIcon()} />
      <View style={styles.details}>
        <Text style={styles.text}>{getCopy()}</Text>
        {event.reason && getReason()}
        <Text style={styles.time}>{moment(event.timestamp).format('lll')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  icon: {
    ...layout.icon
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  reason: {
    ...fonts.small,
    marginTop: layout.padding
  },
  text: {
    ...fonts.regular
  },
  time: {
    ...fonts.small,
    color: colors.foregroundLight,
    marginTop: layout.padding
  }
})

import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React, { useEffect } from 'react'
import { FlatList, ScrollView, StyleSheet, Text } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { colors, fonts, layout, weights } from '../../assets'
import {
  Empty,
  NavBar,
  Refresher,
  Separator,
  ServiceDomain,
  Spinner,
  Touchable
} from '../../components'
import {
  ICronJob,
  ICustomDomain,
  IQueryCronJobArgs,
  IQueryCustomDomainsArgs,
  IQueryServerArgs,
  IServer
} from '../../graphql/types'
import { link } from '../../lib'

export const GET_SERVER = gql`
  query server($id: String!) {
    server(id: $id) {
      ...serverFields
      verifiedDomains
      __typename
    }
  }

  fragment serverFields on Server {
    ...serviceFields
    extraInstances
    plan {
      name
      __typename
    }
    startCommand
    staticPublishPath
    url
    __typename
  }

  fragment serviceFields on Service {
    env {
      ...envFields
      __typename
    }
    name
    buildCommand
    autoDeploy
    __typename
  }

  fragment envFields on Env {
    isStatic
    __typename
  }
`

export const GET_CRON_JOB = gql`
  query cronJob($id: String!) {
    cronJob(id: $id) {
      ...cronJobFields
      __typename
    }
  }

  fragment cronJobFields on CronJob {
    ...serviceFields
    command
    schedule
    __typename
  }

  fragment serviceFields on Service {
    name
    buildCommand
    autoDeploy
    __typename
  }
`

export const GET_DOMAINS = gql`
  query customDomains($serverId: String!) {
    customDomains(serverId: $serverId) {
      ...customDomainFields
      __typename
    }
  }

  fragment customDomainFields on CustomDomain {
    id
    name
    verified
    __typename
  }
`

interface Props {
  service: ICronJob | IServer
}

export const ServiceSettings: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const { id, type } = getParam('service')

  const [getServer, getServerQuery] = useLazyQuery<
    {
      server: IServer
    },
    IQueryServerArgs
  >(GET_SERVER, {
    variables: {
      id
    }
  })

  const [getCronJob, getCronJobQuery] = useLazyQuery<
    {
      cronJob: ICronJob
    },
    IQueryCronJobArgs
  >(GET_CRON_JOB, {
    variables: {
      id
    }
  })

  const [getDomains, getDomainsQuery] = useLazyQuery<
    {
      customDomains: ICustomDomain[]
    },
    IQueryCustomDomainsArgs
  >(GET_DOMAINS, {
    variables: {
      serverId: id
    }
  })

  useEffect(() => {
    if (type === 'cron') {
      getCronJob()
    } else {
      getServer()
      getDomains()
    }
  }, [type, getCronJob, getDomains, getServer])

  return (
    <ScrollView
      refreshControl={
        <Refresher
          onRefresh={() => {
            if (type === 'cron') {
              getServerQuery.refetch()
            } else {
              getCronJobQuery.refetch()
              getDomainsQuery.refetch()
            }
          }}
          refreshing={
            getServerQuery.loading ||
            getCronJobQuery.loading ||
            getDomainsQuery.loading
          }
        />
      }>
      {(getServerQuery.loading ||
        getCronJobQuery.loading ||
        getDomainsQuery.loading) && <Spinner size="small" type="bare" />}
      {type === 'cron' && getCronJobQuery.data && (
        <>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{getCronJobQuery.data.cronJob.name}</Text>
          <Separator />
          <Text style={styles.label}>Schedule</Text>
          <Text style={[styles.value, styles.code]}>
            {getCronJobQuery.data.cronJob.schedule}
          </Text>
          <Separator />
          <Text style={styles.label}>Command</Text>
          <Text style={[styles.value, styles.code]}>
            {getCronJobQuery.data.cronJob.command}
          </Text>
          <Separator />
          <Text style={styles.label}>Build command</Text>
          <Text style={[styles.value, styles.code]}>
            {getCronJobQuery.data.cronJob.buildCommand}
          </Text>
          <Separator />
          <Text style={styles.label}>Auto deploy</Text>
          <Text style={[styles.value, styles.code]}>
            {getCronJobQuery.data.cronJob.autoDeploy ? 'Yes' : 'No'}
          </Text>
        </>
      )}
      {type === 'server' && getServerQuery.data && (
        <>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{getServerQuery.data.server.name}</Text>
          <Separator />
          <Text style={styles.label}>Plan</Text>
          <Text style={styles.value}>
            {getServerQuery.data.server.plan.name}
          </Text>
          <Separator />
          <Text style={styles.label}>Link</Text>
          <Touchable
            onPress={() =>
              getServerQuery.data && link.open(getServerQuery.data.server.url)
            }>
            <Text style={[styles.value, styles.link]}>
              {getServerQuery.data.server.url}
            </Text>
          </Touchable>
          <Separator />
          {getServerQuery.data.server.env.isStatic ? (
            <>
              <Text style={styles.label}>Build command</Text>
              <Text style={[styles.value, styles.code]}>
                {getServerQuery.data.server.buildCommand}
              </Text>
              <Separator />
              <Text style={styles.label}>Publish directory</Text>
              <Text style={[styles.value, styles.code]}>
                {getServerQuery.data.server.staticPublishPath}
              </Text>
              <Separator />
              <Text style={styles.label}>Auto deploy</Text>
              <Text style={styles.value}>
                {getServerQuery.data.server.autoDeploy ? 'Yes' : 'No'}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.label}>Instances</Text>
              <Text style={styles.value}>
                {getServerQuery.data.server.extraInstances + 1}
              </Text>
              <Separator />
              <Text style={styles.label}>Build command</Text>
              <Text style={[styles.value, styles.code]}>
                {getServerQuery.data.server.buildCommand}
              </Text>
              <Separator />
              <Text style={styles.label}>Start command</Text>
              <Text style={[styles.value, styles.code]}>
                {getServerQuery.data.server.startCommand}
              </Text>
              <Separator />
              <Text style={styles.label}>Auto deploy</Text>
              <Text style={styles.value}>
                {getServerQuery.data.server.autoDeploy ? 'Yes' : 'No'}
              </Text>
            </>
          )}
          <FlatList
            data={getDomainsQuery.data?.customDomains}
            disableVirtualization
            ItemSeparatorComponent={Separator}
            ListEmptyComponent={<Empty message="No domains found" />}
            ListHeaderComponent={<Text style={styles.title}>Domains</Text>}
            renderItem={({ item }) => <ServiceDomain domain={item} />}
          />
        </>
      )}
    </ScrollView>
  )
}

ServiceSettings.navigationOptions = {
  header: () => <NavBar back title="Settings" />
}

const styles = StyleSheet.create({
  code: {
    ...fonts.code
  },
  label: {
    ...fonts.regular,
    ...weights.medium,
    margin: layout.margin,
    marginBottom: 0
  },
  link: {
    color: colors.primary
  },
  title: {
    ...fonts.subtitle,
    backgroundColor: colors.backgroundDark,
    padding: layout.margin
  },
  value: {
    ...fonts.regular,
    marginBottom: layout.margin,
    marginHorizontal: layout.margin,
    marginTop: layout.padding
  }
})

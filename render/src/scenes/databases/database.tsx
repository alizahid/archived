import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import moment from 'moment'
import prettyBytes from 'pretty-bytes'
import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { colors, fonts, layout, weights } from '../../assets'
import {
  NavBar,
  Refresher,
  SensitiveText,
  Separator,
  Spinner
} from '../../components'
import { DatabaseBackup } from '../../components/databases'
import { IDatabase, IQueryDatabaseArgs } from '../../graphql/types'

export const GET_DATABASE = gql`
  query database($id: String!) {
    database(id: $id) {
      ...databaseFields
      password
      storageUsedPercent
      storageTotal
      __typename
    }
  }

  fragment databaseFields on Database {
    id
    createdAt
    databaseName
    databaseUser
    plan
    status
    __typename
  }
`

export const GET_DATABASE_BACKUPS = gql`
  query databaseBackupsQuery($databaseId: String!) {
    database(id: $databaseId) {
      id
      backups {
        edges {
          node {
            id
            createdAt
            baseUrl
            sqlUrl
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

interface Props {
  database: IDatabase
}

export const Database: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const { id } = getParam('database')

  const database = useQuery<
    {
      database: IDatabase
    },
    IQueryDatabaseArgs
  >(GET_DATABASE, {
    variables: {
      id
    }
  })

  const backups = useQuery<{
    database: IDatabase
  }>(GET_DATABASE_BACKUPS, {
    variables: {
      databaseId: id
    }
  })

  const loading = database.loading || backups.loading

  const ready = Boolean(database.data?.database.password)

  return (
    <ScrollView
      style={styles.main}
      refreshControl={
        <Refresher
          refreshing={loading}
          onRefresh={() => {
            database.refetch()
            backups.refetch()
          }}
        />
      }>
      <Text style={styles.title}>Database</Text>
      {database.loading && <Spinner size="small" type="bare" />}
      {database.data?.database && (
        <>
          <Text style={styles.label}>Created</Text>
          <Text style={styles.value}>
            {moment(database.data.database.createdAt).fromNow()}
          </Text>
          <Separator />
          <Text style={styles.label}>Plan</Text>
          <Text style={styles.value}>{database.data.database.plan}</Text>
          <Separator />
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{database.data.database.status}</Text>
          {ready && (
            <>
              <Separator />
              <Text style={styles.label}>Storage</Text>
              <Text style={styles.value}>
                {`${
                  database.data.database.storageUsedPercent
                }% used out of ${prettyBytes(
                  Number(database.data.database.storageTotal)
                )}`}
              </Text>
              <Text style={styles.title}>Connection</Text>
              <Text style={styles.label}>Hostname</Text>
              <Text style={[styles.value, styles.code]} selectable>
                {database.data.database.id}
              </Text>
              <Separator />
              <Text style={styles.label}>Port</Text>
              <Text style={[styles.value, styles.code]} selectable>
                5432
              </Text>
              <Separator />
              <Text style={styles.label}>Database</Text>
              <Text style={[styles.value, styles.code]} selectable>
                {database.data.database.databaseName}
              </Text>
              <Separator />
              <Text style={styles.label}>Username</Text>
              <Text style={[styles.value, styles.code]} selectable>
                {database.data.database.databaseUser}
              </Text>
              <Separator />
              <SensitiveText
                isValueCode
                label="Password"
                value={`${database.data.database.password}`}
              />
              <Separator />
              <SensitiveText
                isValueCode
                label="Internal connection string"
                value={`postgres://${database.data.database.databaseUser}:${database.data.database.password}@${database.data.database.id}/${database.data.database.databaseName}`}
              />
              <Separator />
              <SensitiveText
                isValueCode
                label="External connection string"
                value={`postgres://${database.data.database.databaseUser}:${database.data.database.password}@postgres.render.com/${database.data.database.databaseName}`}
              />
              <Separator />
              <SensitiveText
                isValueCode
                label="PSQL command"
                value={`PGPASSWORD=${database.data.database.password} psql -h postgres.render.com -U ${database.data.database.databaseUser} ${database.data.database.databaseName}`}
              />
            </>
          )}
        </>
      )}
      <Text style={styles.title}>Backups</Text>
      {backups.loading && <Spinner size="small" type="bare" />}
      {backups.data?.database.backups?.edges.length === 0 && (
        <Text style={styles.empty}>
          Databases are backed up every 24 hours.
        </Text>
      )}
      <FlatList
        data={backups.data?.database.backups?.edges}
        disableVirtualization
        ItemSeparatorComponent={Separator}
        keyExtractor={({ node: { id } }) => id}
        renderItem={({ item: { node } }) => <DatabaseBackup backup={node} />}
      />
    </ScrollView>
  )
}

Database.navigationOptions = ({ navigation: { getParam } }) => ({
  header: () => <NavBar back title={getParam('database').name} />
})

const styles = StyleSheet.create({
  code: {
    ...fonts.code
  },
  empty: {
    ...fonts.regular,
    margin: layout.margin
  },
  label: {
    ...fonts.regular,
    ...weights.medium,
    margin: layout.margin,
    marginBottom: 0
  },
  main: {
    flex: 1
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

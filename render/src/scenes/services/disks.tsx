import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { fonts, layout, weights } from '../../assets'
import { Empty, NavBar, Refresher, Separator, Spinner } from '../../components'
import { ICronJob, IQueryServerArgs, IServer } from '../../graphql/types'

export const GET_DISKS = gql`
  query server($id: String!) {
    server(id: $id) {
      ...serverFields
      __typename
    }
  }

  fragment serverFields on Server {
    disk {
      ...diskFields
      __typename
    }
    __typename
  }

  fragment diskFields on Disk {
    name
    mountPath
    sizeGB
    __typename
  }
`

interface Props {
  service: ICronJob | IServer
}

export const ServiceDisks: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const { id } = getParam('service')

  const { data, loading, refetch } = useQuery<
    {
      server: IServer
    },
    IQueryServerArgs
  >(GET_DISKS, {
    variables: {
      id
    }
  })

  if (loading) {
    return <Spinner />
  }

  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={styles.content}
      refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}>
      {!data?.server.disk && <Empty message="No disks found" />}
      {data?.server.disk && (
        <View>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{data.server.disk.name}</Text>
          <Separator />
          <Text style={styles.label}>Mount path</Text>
          <Text style={styles.value}>{data.server.disk.mountPath}</Text>
          <Separator />
          <Text style={styles.label}>Size</Text>
          <Text style={styles.value}>{data.server.disk.sizeGB} GB</Text>
        </View>
      )}
    </ScrollView>
  )
}

ServiceDisks.navigationOptions = {
  header: () => <NavBar back title="Disks" />
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
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
  value: {
    ...fonts.regular,
    marginBottom: layout.margin,
    marginHorizontal: layout.margin,
    marginTop: layout.padding
  }
})

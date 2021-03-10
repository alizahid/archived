import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { sortBy } from 'lodash'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { img_dark_add } from '../../../assets'
import {
  Empty,
  ListActions,
  NavBar,
  Refresher,
  Separator
} from '../../../components'
import { ServiceHeader } from '../../../components/services'
import {
  ICronJob,
  IHeader,
  IMutationSaveHeadersArgs,
  IQueryServiceLogsArgs,
  IServer
} from '../../../graphql/types'
import { dialog, helpers } from '../../../lib'
import { UPDATE_HEADERS } from './edit-header'

export const GET_HEADERS = gql`
  query headersForService($serviceId: String!) {
    headersForService(serviceId: $serviceId) {
      ...headerFields
      __typename
    }
  }

  fragment headerFields on Header {
    id
    key
    path
    value
    __typename
  }
`

interface Props {
  headers: IHeader[]
  service: ICronJob | IServer
}

export const ServiceHeaders: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, navigate, setParams }
}) => {
  const { id } = getParam('service')

  const { data, loading, refetch } = useQuery<
    {
      headersForService: IHeader[]
    },
    IQueryServiceLogsArgs
  >(GET_HEADERS, {
    variables: {
      serviceId: id
    }
  })

  const [updateHeaders, updateHeadersMutation] = useMutation<
    {},
    IMutationSaveHeadersArgs
  >(UPDATE_HEADERS, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_HEADERS,
          variables: {
            serviceId: id
          }
        }
      ]
    }
  })

  useEffect(() => {
    if (!getParam('headers') && data?.headersForService) {
      setParams({
        headers: data.headersForService
      })
    }
  }, [id, data, getParam, setParams])

  return (
    <SwipeListView
      contentContainerStyle={styles.content}
      data={sortBy(data?.headersForService, 'sequence')}
      disableRightSwipe
      ListEmptyComponent={<Empty message="No headers found" />}
      ItemSeparatorComponent={Separator}
      refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
      renderHiddenItem={({ item }) => (
        <ListActions
          loading={updateHeadersMutation.loading}
          onEdit={() =>
            navigate('EditServiceHeader', {
              header: item,
              headers: data?.headersForService,
              serviceId: id
            })
          }
          onDelete={async () => {
            if (!data?.headersForService) {
              return
            }

            const yes = await dialog.confirm(
              'Delete header',
              'Are you sure you want to delete this header?'
            )

            if (yes) {
              updateHeaders({
                variables: {
                  headerInputs: helpers
                    .removeAllFields(
                      data.headersForService.filter(({ id }) => id !== item.id),
                      ['__typename', 'id']
                    )
                    .map(header => ({
                      ...header,
                      enabled: true
                    })),
                  serviceId: id
                }
              })
            }
          }}
        />
      )}
      renderItem={({ item }) => <ServiceHeader header={item} />}
      rightOpenValue={-120}
    />
  )
}

ServiceHeaders.navigationOptions = ({
  navigation: { getParam, navigate }
}) => ({
  header: () => (
    <NavBar
      action={{
        icon: img_dark_add,
        onPress: () =>
          navigate('AddServiceHeader', {
            headers: getParam('headers'),
            serviceId: getParam('service').id
          })
      }}
      back
      title="Headers"
    />
  )
})

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  }
})

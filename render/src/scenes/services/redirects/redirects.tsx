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
  Separator,
  ServiceRedirectRule
} from '../../../components'
import {
  ICronJob,
  IMutationSaveRedirectRulesArgs,
  IQueryRedirectRulesArgs,
  IRedirectRule,
  IServer
} from '../../../graphql/types'
import { dialog, helpers } from '../../../lib'
import { UPDATE_REDIRECT_RULES } from './edit-redirect'

export const GET_REDIRECT_RULES = gql`
  query redirectRules($serverId: String!) {
    redirectRules(serverId: $serverId) {
      ...redirectRuleFields
      __typename
    }
  }

  fragment redirectRuleFields on RedirectRule {
    id
    sequence
    source
    destination
    enabled
    httpStatus
    __typename
  }
`

interface Props {
  redirectRules: IRedirectRule[]
  serverId: string
  service: ICronJob | IServer
}

export const ServiceRedirects: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, navigate, setParams }
}) => {
  const { id } = getParam('service')

  const { data, loading, refetch } = useQuery<
    {
      redirectRules: IRedirectRule[]
    },
    IQueryRedirectRulesArgs
  >(GET_REDIRECT_RULES, {
    variables: {
      serverId: id
    }
  })

  const [updateRedirectRules, updateRedirectRulesMutation] = useMutation<
    {},
    IMutationSaveRedirectRulesArgs
  >(UPDATE_REDIRECT_RULES, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_REDIRECT_RULES,
          variables: {
            serverId: id
          }
        }
      ]
    }
  })

  useEffect(() => {
    if (!getParam('serverId') && data?.redirectRules) {
      setParams({
        redirectRules: data.redirectRules,
        serverId: id
      })
    }
  }, [id, data, getParam, setParams])

  return (
    <SwipeListView
      contentContainerStyle={styles.content}
      data={sortBy(data?.redirectRules, 'sequence')}
      disableRightSwipe
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={<Empty message="No redirect rules found" />}
      refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
      renderHiddenItem={({ item }) => (
        <ListActions
          loading={updateRedirectRulesMutation.loading}
          onEdit={() =>
            navigate('EditServiceRedirect', {
              redirectRule: item,
              redirectRules: data?.redirectRules,
              serverId: id
            })
          }
          onDelete={async () => {
            if (!data?.redirectRules) {
              return
            }

            const yes = await dialog.confirm(
              'Delete rule',
              'Are you sure you want to delete this rule?'
            )

            if (yes) {
              updateRedirectRules({
                variables: {
                  rules: helpers.removeAllFields(
                    data.redirectRules.filter(
                      redirect => redirect.id !== item.id
                    ),
                    ['__typename', 'id', 'sequence']
                  ),
                  serverId: id
                }
              })
            }
          }}
        />
      )}
      renderItem={({ item }) => <ServiceRedirectRule rule={item} />}
      rightOpenValue={-120}
    />
  )
}

ServiceRedirects.navigationOptions = ({
  navigation: { getParam, navigate }
}) => ({
  header: () => (
    <NavBar
      action={{
        icon: img_dark_add,
        onPress: () =>
          navigate('AddServiceRedirect', {
            redirectRules: getParam('redirectRules'),
            serverId: getParam('serverId')
          })
      }}
      back
      title="Redirects and rewrites"
    />
  )
})

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  }
})

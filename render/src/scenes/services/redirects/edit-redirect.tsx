import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { set } from 'immutable'
import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { EditRedirect, NavBar } from '../../../components'
import {
  IMutationSaveRedirectRulesArgs,
  IRedirectRule
} from '../../../graphql/types'
import { helpers } from '../../../lib'
import { GET_REDIRECT_RULES } from './redirects'

export const UPDATE_REDIRECT_RULES = gql`
  mutation saveRedirectRules(
    $serverId: String!
    $rules: [RedirectRuleInput!]!
  ) {
    saveRedirectRules(serverId: $serverId, rules: $rules) {
      __typename
    }
  }
`

interface Props {
  redirectRule: IRedirectRule
  redirectRules: IRedirectRule[]
  serverId: string
}

export const EditServiceRedirect: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const redirectRule = getParam('redirectRule')
  const redirectRules = getParam('redirectRules')
  const serverId = getParam('serverId')

  const [updateRedirectRules, { loading }] = useMutation<
    {},
    IMutationSaveRedirectRulesArgs
  >(UPDATE_REDIRECT_RULES, {
    awaitRefetchQueries: true,
    refetchQueries() {
      return [
        {
          query: GET_REDIRECT_RULES,
          variables: {
            serverId
          }
        }
      ]
    }
  })

  return (
    <EditRedirect
      rule={redirectRule}
      loading={loading}
      onSave={(source, destination, httpStatus) => {
        const index = redirectRules.findIndex(
          ({ id }) => id === redirectRule.id
        )

        updateRedirectRules({
          variables: {
            rules: helpers.removeAllFields(
              set(redirectRules, index, {
                ...redirectRule,
                destination,
                httpStatus,
                source
              }),
              ['__typename', 'id', 'sequence']
            ),
            serverId
          }
        })
      }}
    />
  )
}

EditServiceRedirect.navigationOptions = {
  header: () => <NavBar back title="Edit redirect rule" />
}

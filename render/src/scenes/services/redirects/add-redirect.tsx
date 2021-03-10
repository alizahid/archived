import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

import { EditRedirect, NavBar } from '../../../components'
import {
  IMutationSaveRedirectRulesArgs,
  IRedirectRule
} from '../../../graphql/types'
import { helpers } from '../../../lib'
import { UPDATE_REDIRECT_RULES } from './edit-redirect'
import { GET_REDIRECT_RULES } from './redirects'

interface Props {
  redirectRules: IRedirectRule[]
  serverId: string
}

export const AddServiceRedirect: NavigationStackScreenComponent<Props> = ({
  navigation: { getParam, pop }
}) => {
  const redirectRules = getParam('redirectRules')
  const serverId = getParam('serverId')

  const [updateRedirectRules, { loading }] = useMutation<
    {},
    IMutationSaveRedirectRulesArgs
  >(UPDATE_REDIRECT_RULES, {
    awaitRefetchQueries: true,
    onCompleted() {
      pop()
    },
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
      loading={loading}
      onSave={(source, destination, httpStatus) =>
        updateRedirectRules({
          variables: {
            rules: helpers.removeAllFields(
              [
                ...redirectRules,
                {
                  destination,
                  enabled: true,
                  httpStatus,
                  source
                }
              ],
              ['__typename', 'id', 'sequence']
            ),
            serverId
          }
        })
      }
    />
  )
}

AddServiceRedirect.navigationOptions = {
  header: () => <NavBar back title="Add redirect rule" />
}

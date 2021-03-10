import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { orderBy } from 'lodash'
import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout } from '../../assets'
import { IPlanData, IQueryNewPaidServiceAllowedArgs } from '../../graphql/types'
import { dialog } from '../../lib'
import { useAuth } from '../../store'
import { Refresher } from '../refresher'
import { Separator } from '../separator'
import { Spinner } from '../spinner'
import { DatabasePlan } from './plan'

export const GET_DATABASE_PLANS = gql`
  query databasePlans {
    databasePlans {
      ...planFields
      __typename
    }
  }

  fragment planFields on PlanData {
    id
    name
    price
    mem
    cpu
    size
    needsPaymentInfo
    __typename
  }
`

export const NEW_PAID_SERVICE_ALLOWED = gql`
  query newPaidServiceAllowed($userId: String!) {
    newPaidServiceAllowed(userId: $userId)
  }
`

interface Props {
  onChange: (plan: IPlanData) => void
}

export const DatabasePlans: FunctionComponent<Props> = ({ onChange }) => {
  const [{ userId }] = useAuth()

  const { data, loading, refetch } = useQuery<{
    databasePlans: IPlanData[]
  }>(GET_DATABASE_PLANS)

  const check = useQuery<
    {
      newPaidServiceAllowed: boolean
    },
    IQueryNewPaidServiceAllowedArgs
  >(NEW_PAID_SERVICE_ALLOWED, {
    variables: {
      userId: userId as string
    }
  })

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={orderBy(data?.databasePlans, 'price', 'asc')}
      ItemSeparatorComponent={Separator}
      keyExtractor={({ id }) => id}
      ListEmptyComponent={<Spinner />}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.title}>Choose a plan</Text>
          <Text style={styles.body}>
            We don't support downgrading database plans yet. Make sure to pick
            the least expensive plan that works for you.
          </Text>
        </View>
      )}
      refreshControl={<Refresher refreshing={loading} onRefresh={refetch} />}
      renderItem={({ item }) => (
        <DatabasePlan
          plan={item}
          onPress={() => {
            if (item.needsPaymentInfo && !check.data?.newPaidServiceAllowed) {
              return dialog.alert(
                'Payment details required',
                'The plan you chose requires you to add a payment method to your account.'
              )
            }

            onChange(item)
          }}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  body: {
    ...fonts.regular,
    marginTop: layout.padding,
    textAlign: 'center'
  },
  content: {
    flexGrow: 1
  },
  header: {
    backgroundColor: colors.backgroundDark,
    padding: layout.margin
  },
  title: {
    ...fonts.subtitle,
    textAlign: 'center'
  }
})

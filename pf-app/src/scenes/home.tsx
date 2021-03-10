import { RouteProp, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { Refresh } from '../components/refresh'
import { ListSeparator } from '../components/separator'
import { SummaryCard } from '../components/summary'
import { HomeParams } from '../navigators/home'
import { useSummary } from '../store/summary'
import { layout, typography } from '../styles'

type Props = {
  navigation: StackNavigationProp<HomeParams, 'Home'>
  route: RouteProp<HomeParams, 'Home'>
}

export const HomeScene: FunctionComponent<Props> = () => {
  const theme = useTheme()
  const { formatDate, formatMessage, formatTime } = useIntl()

  const [{ countries, loading }, { fetch }] = useSummary()

  useEffect(() => {
    fetch()
  }, [fetch])

  const styles = StyleSheet.create({
    header: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: StyleSheet.hairlineWidth,
      padding: layout.margin
    },
    updated: {
      ...typography.small,
      color: theme.colors.text,
      opacity: 0.5,
      textAlign: 'center'
    }
  })

  return (
    <FlatList
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={
        countries.length > 0 ? (
          <View style={styles.header}>
            <Text style={styles.updated}>
              {formatMessage(
                { id: 'screen__home__summary_updated' },
                {
                  date: formatDate(countries[0].updated),
                  time: formatTime(countries[0].updated)
                }
              )}
            </Text>
          </View>
        ) : null
      }
      data={countries}
      refreshControl={<Refresh onRefresh={fetch} refreshing={loading} />}
      renderItem={({ item }) => <SummaryCard data={item} />}
    />
  )
}

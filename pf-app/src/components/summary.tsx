import { useTheme } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { layout, typefaces, typography } from '../styles'
import { CountrySummary } from '../types'

type Props = {
  data: CountrySummary
}

export const SummaryCard: FunctionComponent<Props> = ({ data }) => {
  const theme = useTheme()
  const { formatMessage, formatNumber } = useIntl()

  const styles = StyleSheet.create({
    card: {
      flex: 1,
      marginLeft: layout.margin
    },
    cards: {
      flexDirection: 'row',
      marginLeft: -layout.margin,
      marginTop: layout.padding
    },
    label: {
      ...typography.small,
      color: theme.colors.text,
      fontFamily: typefaces.inter.medium,
      textAlign: 'left'
    },
    main: {
      padding: layout.margin
    },
    name: {
      ...typography.title,
      color: theme.colors.text,
      textAlign: 'left'
    },
    section: {
      marginTop: layout.padding
    },
    title: {
      ...typography.subtitle,
      color: theme.colors.text,
      textAlign: 'left'
    },
    value: {
      ...typography.regular,
      color: theme.colors.text,
      textAlign: 'left'
    }
  })

  return (
    <View style={styles.main}>
      <Text style={styles.name}>{data.name}</Text>
      <View style={styles.cards}>
        {['cases', 'deaths', 'recovered'].map((type) => (
          <View key={type} style={styles.card}>
            <Text style={styles.title}>
              {formatMessage({
                id: `component__country__${type}`
              })}
            </Text>
            {['new', 'total'].map((subtype) => (
              <View key={`${type}-${subtype}`} style={styles.section}>
                <Text style={styles.label}>
                  {formatMessage({
                    id: `component__country__${subtype}`
                  })}
                </Text>
                <Text style={styles.value}>
                  {formatNumber((data as any)[type][subtype])}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

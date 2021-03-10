import { useTheme } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import { StyleSheet, Text, View } from 'react-native'

import { layout, typefaces, typography } from '../styles'
import { CountryDetails } from '../types'

type Props = {
  data: CountryDetails
}

export const DetailCard: FunctionComponent<Props> = ({ data }) => {
  const theme = useTheme()
  const { formatDate, formatMessage, formatNumber } = useIntl()

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
    date: {
      ...typography.subtitle,
      color: theme.colors.text,
      textAlign: 'left'
    },
    label: {
      ...typography.regular,
      color: theme.colors.text,
      textAlign: 'left'
    },
    main: {
      padding: layout.margin
    },
    title: {
      ...typography.small,
      color: theme.colors.text,
      fontFamily: typefaces.inter.medium,
      textAlign: 'left'
    }
  })

  return (
    <View style={styles.main}>
      <Text style={styles.date}>{formatDate(data.date)}</Text>
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {formatMessage({ id: 'component__details__active' })}
          </Text>
          <Text style={styles.label}>{formatNumber(data.active)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>
            {formatMessage({ id: 'component__details__confirmed' })}
          </Text>
          <Text style={styles.label}>{formatNumber(data.confirmed)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>
            {formatMessage({ id: 'component__details__deaths' })}
          </Text>
          <Text style={styles.label}>{formatNumber(data.deaths)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>
            {formatMessage({ id: 'component__details__recovered' })}
          </Text>
          <Text style={styles.label}>{formatNumber(data.recovered)}</Text>
        </View>
      </View>
    </View>
  )
}

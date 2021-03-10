import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout, weights } from '../../assets'
import { IRedirectRule } from '../../graphql/types'

interface Props {
  rule: IRedirectRule
}

export const ServiceRedirectRule: FunctionComponent<Props> = ({ rule }) => (
  <View style={styles.main}>
    <Text style={styles.label}>Source</Text>
    <Text style={styles.value}>{rule.source}</Text>
    <Text style={styles.label}>Destination</Text>
    <Text style={styles.value}>{rule.destination}</Text>
    <Text style={styles.label}>Type</Text>
    <Text style={styles.value}>
      {rule.httpStatus === 301 ? 'Redirect' : 'Rewrite'}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  label: {
    ...fonts.regular,
    ...weights.medium,
    marginTop: layout.margin
  },
  main: {
    backgroundColor: colors.background,
    padding: layout.margin,
    paddingTop: 0
  },
  value: {
    ...fonts.code,
    marginTop: layout.padding
  }
})

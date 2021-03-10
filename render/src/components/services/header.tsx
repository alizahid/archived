import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout, weights } from '../../assets'
import { IHeader } from '../../graphql/types'

interface Props {
  header: IHeader
}

export const ServiceHeader: FunctionComponent<Props> = ({ header }) => (
  <View style={styles.main}>
    <Text style={styles.label}>Path</Text>
    <Text style={styles.value}>{header.path}</Text>
    <Text style={styles.label}>Key</Text>
    <Text style={styles.value}>{header.key}</Text>
    <Text style={styles.label}>Value</Text>
    <Text style={styles.value}>{header.value}</Text>
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

import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout } from '../../assets'
import { ICustomDomain } from '../../graphql/types'

interface Props {
  domain: ICustomDomain
}

export const ServiceDomain: FunctionComponent<Props> = ({ domain }) => (
  <View style={styles.main}>
    <Text style={styles.domain}>{domain.name}</Text>
    {domain.verified && (
      <View style={styles.tag}>
        <Text style={styles.tagLabel}>verified</Text>
      </View>
    )}
  </View>
)

const styles = StyleSheet.create({
  domain: {
    ...fonts.regular
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'row',
    padding: layout.margin
  },
  tag: {
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.border.radius,
    marginLeft: layout.padding,
    padding: layout.padding / 2
  },
  tagLabel: {
    ...fonts.small
  }
})

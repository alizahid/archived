import moment from 'moment'
import pluralize from 'pluralize'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout, weights } from '../../assets'
import { IEnvGroup } from '../../graphql/types'
import { Touchable } from '../touchable'

interface Props {
  envGroup: IEnvGroup

  onPress: () => void
}

export const EnvGroup: FunctionComponent<Props> = ({ envGroup, onPress }) => (
  <Touchable style={styles.main} highlight onPress={onPress}>
    <View style={styles.header}>
      <Text style={styles.name}>{envGroup.name}</Text>
      <Text style={styles.updated}>
        Updated {moment(envGroup.updatedAt).fromNow()}
      </Text>
    </View>
    <View style={styles.variables}>
      <Text style={styles.variablesLabel}>
        {pluralize('variable', envGroup.envVars.length, true)}
      </Text>
    </View>
  </Touchable>
)

const styles = StyleSheet.create({
  header: {
    flex: 1
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'row',
    padding: layout.margin
  },
  name: {
    ...fonts.regular,
    ...weights.medium,
    flex: 1
  },
  updated: {
    ...fonts.small,
    color: colors.foregroundLight,
    marginTop: layout.padding
  },
  variables: {
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.border.radius,
    padding: layout.padding / 2
  },
  variablesLabel: {
    ...fonts.small
  }
})

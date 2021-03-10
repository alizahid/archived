import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout, weights } from '../../assets'
import { IDatabase } from '../../graphql/types'
import { Touchable } from '../touchable'

interface Props {
  database: IDatabase

  onPress: () => void
}

export const Database: FunctionComponent<Props> = ({ database, onPress }) => (
  <Touchable style={styles.main} highlight onPress={() => onPress()}>
    <View style={styles.header}>
      <Text style={styles.name}>{database.name}</Text>
      <Text style={styles.type}>{database.type}</Text>
    </View>
    <View
      style={[
        styles.status,
        {
          backgroundColor:
            database.status === 'AVAILABLE'
              ? colors.status.available
              : database.status === 'CREATING'
              ? colors.status.creating
              : colors.backgroundDark
        }
      ]}>
      <Text style={styles.statusLabel}>{database.status.toLowerCase()}</Text>
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
  status: {
    borderRadius: layout.border.radius,
    marginLeft: layout.margin,
    padding: layout.padding / 2
  },
  statusLabel: {
    ...fonts.small,
    color: colors.background
  },
  type: {
    ...fonts.small,
    color: colors.foregroundLight,
    marginTop: layout.padding
  }
})

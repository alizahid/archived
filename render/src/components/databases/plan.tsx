import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout, weights } from '../../assets'
import { IPlanData } from '../../graphql/types'
import { Touchable } from '../touchable'

interface Props {
  plan: IPlanData

  onPress?: () => void
}

export const DatabasePlan: FunctionComponent<Props> = ({ onPress, plan }) => {
  const content = (
    <>
      <Text style={styles.name}>{plan.name}</Text>
      <View style={styles.configuration}>
        <View style={styles.column}>
          <Text style={styles.label}>RAM</Text>
          <Text style={styles.value}>{plan.mem}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>CPU</Text>
          <Text style={styles.value}>{plan.cpu}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Storage</Text>
          <Text style={styles.value}>{plan.size}</Text>
        </View>
      </View>
      <Text style={styles.price}>${plan.price}/month</Text>
    </>
  )

  if (onPress) {
    return <Touchable onPress={onPress}>{content}</Touchable>
  }

  return <View>{content}</View>
}

const styles = StyleSheet.create({
  column: {
    alignItems: 'center',
    flex: 1,
    margin: layout.padding
  },
  configuration: {
    flexDirection: 'row'
  },
  label: {
    ...fonts.small,
    ...weights.medium
  },
  name: {
    ...fonts.subtitle,
    alignSelf: 'center',
    color: colors.primary,
    margin: layout.margin
  },
  price: {
    ...fonts.title,
    alignSelf: 'center',
    margin: layout.margin
  },
  value: {
    ...fonts.regular,
    marginTop: layout.padding
  }
})

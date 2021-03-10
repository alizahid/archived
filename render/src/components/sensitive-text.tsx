import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout, weights } from '../assets'
import { Touchable } from './touchable'

interface Props {
  isLabelCode?: boolean
  isValueCode?: boolean
  label: string
  value: string
}

export const SensitiveText: FunctionComponent<Props> = ({
  isLabelCode,
  isValueCode,
  label,
  value
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text
          style={[
            styles.key,
            isLabelCode && styles.code,
            isLabelCode && styles.codeMedium
          ]}>
          {label}
        </Text>
        <Touchable style={styles.toggle} onPress={() => setVisible(!visible)}>
          <Text style={styles.label}>{visible ? 'Hide' : 'Show'}</Text>
        </Touchable>
      </View>
      <Text
        style={[
          styles.value,
          !visible && styles.mask,
          isValueCode && styles.code
        ]}
        selectable={visible}>
        {visible ? value : '●●●●●●●●'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  code: {
    ...fonts.code
  },
  codeMedium: {
    ...weights.codeMedium
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  key: {
    ...fonts.regular,
    ...weights.medium,
    flex: 1
  },
  label: {
    ...fonts.small,
    padding: layout.padding / 2
  },
  main: {
    backgroundColor: colors.background,
    padding: layout.margin
  },
  mask: {
    letterSpacing: 2
  },
  toggle: {
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.border.radius,
    marginLeft: layout.margin
  },
  value: {
    ...fonts.regular,
    marginTop: layout.padding
  }
})

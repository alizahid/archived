import { useTheme } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

export const ListSeparator: FunctionComponent = () => {
  const theme = useTheme()

  const styles = StyleSheet.create({
    main: {
      backgroundColor: theme.colors.border,
      height: StyleSheet.hairlineWidth
    }
  })

  return <View style={styles.main} />
}

import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { fonts, layout, nav } from '../../assets'
import { Button } from '../button'

interface Props {
  onPress: () => void
}

export const EmptyDatabase: FunctionComponent<Props> = ({ onPress }) => (
  <View style={styles.main}>
    <Image style={styles.icon} source={nav.Databases.base} />
    <Text style={styles.message}>You have no databases right now.</Text>
    <Button label="Create" onPress={() => onPress()} />
  </View>
)

const styles = StyleSheet.create({
  icon: {
    ...layout.logo
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    ...fonts.regular,
    marginVertical: layout.margin
  }
})

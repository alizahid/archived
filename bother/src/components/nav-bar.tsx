import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'

import { colors, fonts, layout, shadow } from '../styles'

interface Props {
  back?: boolean
  title: string
}

const NavBar: FunctionComponent<Props> = ({ back, title }) => {
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    ...shadow,
    backgroundColor: colors.background
  },
  title: {
    ...fonts.title,
    padding: layout.margin
  }
})

export default NavBar

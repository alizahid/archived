import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'

import { colors, fonts, layout, shadow } from '../styles'

interface Props {
  index: number
  routes: {
    key: string
  }[]

  onIndexChange(index: number): void
}

const PostsTabBar: FunctionComponent<Props> = ({
  index,
  routes,
  onIndexChange
}) => {
  return (
    <SafeAreaView style={styles.main}>
      {routes.map(({ key }, current) => (
        <TouchableOpacity
          key={key}
          style={styles.link}
          onPress={() => onIndexChange(current)}
        >
          <Text style={[styles.label, current === index && styles.active]}>
            {key}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    ...shadow,
    backgroundColor: colors.background,
    flexDirection: 'row'
  },
  link: {
    padding: layout.margin
  },
  label: {
    fontSize: 18
  },
  active: {
    ...fonts.semibold,
    color: colors.primary
  }
})

export default PostsTabBar

import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { iOSColors, iOSUIKit } from 'react-native-typography'

import { useActions, useStore } from '../store'
import { layout, shadow } from '../styles'

const Periods: FunctionComponent = () => {
  const { interval } = useStore(state => state.articles)
  const { setInterval } = useActions(actions => actions.articles)

  const intervals = [
    {
      label: 'Today',
      value: 1
    },
    {
      label: 'Last week',
      value: 7
    },
    {
      label: 'Last month',
      value: 30
    }
  ]

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        {intervals.map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            style={[styles.link, value === interval && styles.active]}
            onPress={() => setInterval(value)}
          >
            <Text
              style={[styles.label, value === interval && styles.highlighted]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    ...shadow,
    backgroundColor: iOSColors.white
  },
  main: {
    flexDirection: 'row',
    padding: layout.margin,
    paddingLeft: 0
  },
  link: {
    borderRadius: layout.radius,
    marginLeft: layout.margin,
    padding: layout.padding
  },
  active: {
    backgroundColor: iOSColors.green
  },
  label: {
    ...iOSUIKit.bodyObject
  },
  highlighted: {
    color: iOSColors.white
  }
})

export default Periods

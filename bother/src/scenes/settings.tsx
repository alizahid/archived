import React, { useState } from 'react'
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { NavigationScreenComponent } from 'react-navigation'

import { NavBar } from '../components'
import { colors, fonts, layout } from '../styles'

const Settings: NavigationScreenComponent = () => {
  const [notifications, setNotifications] = useState(true)

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <Text style={styles.message}>
        Bother lets you share things that annoy you anonymously with others and
        find people who hate the same things as you.
      </Text>
      <View style={styles.option}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          onValueChange={notifications => setNotifications(notifications)}
          trackColor={{
            true: colors.primary,
            false: colors.backgroundDark
          }}
          value={notifications}
        />
      </View>
    </ScrollView>
  )
}

Settings.navigationOptions = {
  header: <NavBar title="Settings" />
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: layout.margin
  },
  message: {
    ...fonts.regular
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: layout.margin
  },
  label: {
    ...fonts.semibold,
    flex: 1,
    marginRight: layout.margin
  }
})

export default Settings

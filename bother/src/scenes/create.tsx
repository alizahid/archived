import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { NavigationScreenComponent } from 'react-navigation'

import { Button, NavBar, TextBox } from '../components'
import { fonts, layout } from '../styles'

const Create: NavigationScreenComponent = () => {
  const [ready, setReady] = useState(false)

  return (
    <ScrollView style={styles.main} keyboardShouldPersistTaps="handled">
      {!ready && (
        <>
          <Text style={styles.line}>
            Tell people what bothers you, but be careful how you phrase it.
          </Text>
          <Text style={styles.line}>Be kind and considerate.</Text>
          <Text style={styles.line}>Don't be offensive or hateful.</Text>
          <Button
            style={styles.button}
            label="I understand"
            onPress={() => setReady(true)}
          />
        </>
      )}
      {ready && (
        <>
          <TextBox autoFocus multiline placeholder="Say something" />
          <Button
            style={styles.button}
            label="Post"
            onPress={() => setReady(false)}
          />
        </>
      )}
    </ScrollView>
  )
}

Create.navigationOptions = {
  header: <NavBar title="What bothers you?" />
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: layout.margin
  },
  line: {
    ...fonts.regular,
    marginTop: layout.padding
  },
  button: {
    marginTop: layout.margin
  }
})

export default Create

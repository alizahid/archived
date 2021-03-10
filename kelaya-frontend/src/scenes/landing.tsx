import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { iOSUIKit } from 'react-native-typography'

import { RootParamList } from '..'
import { Button, Container } from '../components'
import { colors, layout } from '../styles'

interface Props {
  navigation: StackNavigationProp<RootParamList, 'Landing'>
}

export const Landing: FunctionComponent<Props> = ({
  navigation: { navigate }
}) => (
  <Container style={styles.main}>
    <View style={styles.content}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.description}>
        We're gonna help you with something!
      </Text>
      <Button label="Let's get started" onPress={() => navigate('Goals')} />
    </View>
  </Container>
)

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: colors.contentBackground,
    justifyContent: 'center',
    padding: layout.margin
  },
  description: {
    ...iOSUIKit.bodyObject,
    marginVertical: layout.margin,
    textAlign: 'center'
  },
  main: {
    justifyContent: 'center'
  },
  title: {
    ...iOSUIKit.largeTitleEmphasizedObject
  }
})

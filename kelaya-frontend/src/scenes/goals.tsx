import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { iOSUIKit } from 'react-native-typography'

import { RootParamList } from '..'
import { Button, CheckList, Container } from '../components'
import { data_goals } from '../data'
import { useOnboarding } from '../store'
import { colors, layout } from '../styles'

interface Props {
  navigation: StackNavigationProp<RootParamList, 'Goals'>
}

export const Goals: FunctionComponent<Props> = ({
  navigation: { navigate }
}) => {
  const [{ goals }, { setGoals }] = useOnboarding()

  return (
    <Container>
      <View style={styles.content}>
        <Text style={styles.title}>What are your goals?</Text>
        <Text style={styles.description}>
          Help us tailor our program to your needs.
        </Text>
        <CheckList data={data_goals} onChange={(goals) => setGoals(goals)} />
      </View>
      <Button
        disabled={goals.length === 0}
        label="Continue"
        onPress={() => navigate('DueDate')}
        style={styles.button}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 0,
    width: '100%'
  },
  content: {
    alignItems: 'center',
    backgroundColor: colors.contentBackground,
    justifyContent: 'center',
    marginTop: 'auto',
    padding: layout.margin
  },
  description: {
    ...iOSUIKit.bodyObject,
    marginVertical: layout.padding,
    textAlign: 'center'
  },
  title: {
    ...iOSUIKit.title3EmphasizedObject
  }
})

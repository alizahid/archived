import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { iOSUIKit } from 'react-native-typography'

import { RootParamList } from '..'
import { BackButton, Container } from '../components'
import { data_exercise, data_goals } from '../data'
import { useOnboarding } from '../store'
import { colors, layout } from '../styles'

interface Props {
  navigation: StackNavigationProp<RootParamList, 'Summary'>
}

export const Summary: FunctionComponent<Props> = ({
  navigation: { goBack }
}) => {
  const [{ date, exerciseLevel, goals }] = useOnboarding()

  return (
    <Container>
      <BackButton onPress={goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Summary</Text>
        <Text style={styles.label}>Goals</Text>
        {goals.map((goal, index) => (
          <Text key={index} style={styles.value}>
            {data_goals.find(({ value }) => value === goal)?.label}
          </Text>
        ))}
        <Text style={styles.label}>Due date</Text>
        <Text style={styles.value}>{moment(date).format('LL')}</Text>
        <Text style={styles.label}>Exercise level</Text>
        <Text style={styles.value}>{data_exercise[exerciseLevel]}</Text>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: colors.contentBackground,
    padding: layout.margin
  },
  label: {
    ...iOSUIKit.title3EmphasizedObject,
    marginTop: layout.margin,
    textAlign: 'center'
  },
  title: {
    ...iOSUIKit.largeTitleEmphasizedObject
  },
  value: {
    ...iOSUIKit.bodyObject,
    marginTop: layout.padding,
    textAlign: 'center'
  }
})

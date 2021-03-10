import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { iOSUIKit } from 'react-native-typography'

import { RootParamList } from '..'
import { BackButton, Button, Container } from '../components'
import { useOnboarding } from '../store'
import { colors, layout } from '../styles'

interface Props {
  navigation: StackNavigationProp<RootParamList, 'DueDate'>
}

export const DueDate: FunctionComponent<Props> = ({
  navigation: { goBack, navigate }
}) => {
  const [{ date }, { setDate }] = useOnboarding()

  return (
    <Container>
      <BackButton onPress={goBack} />
      <View style={styles.content}>
        <Text style={styles.title}>Select your estimated due date</Text>
        <DatePicker
          date={date}
          maximumDate={moment().add(9, 'months').toDate()}
          minimumDate={new Date()}
          mode="date"
          onDateChange={(date) => setDate(date)}
        />
      </View>
      <Button
        label="Continue"
        onPress={() => navigate('Exercise')}
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
  title: {
    ...iOSUIKit.title3EmphasizedObject,
    marginBottom: layout.margin
  }
})

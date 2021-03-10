import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { iOSColors } from 'react-native-typography'

import { RootParamList } from '..'
import { BackButton, Button, Slider } from '../components'
import { useOnboarding } from '../store'

interface Props {
  navigation: StackNavigationProp<RootParamList, 'Exercise'>
}

export const Exercise: FunctionComponent<Props> = ({
  navigation: { goBack, navigate }
}) => {
  const { bottom, top } = useSafeArea()

  const [{ exerciseLevel }, { setExerciseLevel }] = useOnboarding()

  return (
    <View
      style={[
        styles.main,
        {
          paddingBottom: bottom,
          paddingTop: top
        }
      ]}>
      <BackButton onPress={goBack} />
      <Slider
        level={exerciseLevel}
        onChange={(level) => setExerciseLevel(level)}
      />
      <Button
        label="Continue"
        onPress={() => navigate('Summary')}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 0,
    width: '100%'
  },
  main: {
    backgroundColor: iOSColors.white,
    flex: 1
  }
})

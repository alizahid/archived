import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { DueDate, Exercise, Goals, Summary } from './scenes'

export type RootParamList = {
  Goals: undefined
  DueDate: undefined
  Exercise: undefined
  Summary: undefined
}

const { Navigator, Screen } = createStackNavigator<RootParamList>()

export const Kelaya: FunctionComponent = () => (
  <NavigationContainer>
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <Navigator headerMode="none">
        <Screen component={Goals} name="Goals" />
        <Screen component={DueDate} name="DueDate" />
        <Screen component={Exercise} name="Exercise" />
        <Screen component={Summary} name="Summary" />
      </Navigator>
    </SafeAreaProvider>
  </NavigationContainer>
)

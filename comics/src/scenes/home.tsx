import AsyncStorage from '@react-native-community/async-storage'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { isTablet } from 'react-native-device-info'
import { useSafeArea } from 'react-native-safe-area-context'

import { StackParamList } from '..'
import { Comic, Spinner } from '../components'
import { useOrientation } from '../hooks'
import { useComics } from '../store'

interface Props {
  navigation: StackNavigationProp<StackParamList, 'Home'>
}

export const Home: FunctionComponent<Props> = ({
  navigation: { navigate }
}) => {
  const [{ comics }, { init }] = useComics()

  const { bottom } = useSafeArea()
  const { isLandscape } = useOrientation()

  const [ready, setReady] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('@comics').then(state => {
      if (state !== null) {
        init(JSON.parse(state))
      }

      setReady(true)
    })
  }, [init])

  if (!ready) {
    return <Spinner />
  }

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={comics}
      key={isTablet() || isLandscape ? 'four' : 'two'}
      numColumns={isTablet() || isLandscape ? 4 : 2}
      renderItem={({ item }) => (
        <Comic
          comic={item}
          onPress={() =>
            navigate('Comic', {
              comic: item
            })
          }
        />
      )}
      style={{
        marginBottom: bottom
      }}
    />
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 10
  }
})

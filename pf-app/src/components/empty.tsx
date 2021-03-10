import { useTheme } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Image, { Source } from 'react-native-fast-image'

import { layout, typography } from '../styles'
import { Button } from './button'

type Props = {
  action?: {
    label: string

    onPress: () => void
  }
  image?: Source
  message: string
}

export const Empty: FunctionComponent<Props> = ({ action, image, message }) => {
  const theme = useTheme()

  const { width } = Dimensions.get('window')

  const styles = StyleSheet.create({
    button: {
      marginTop: layout.margin * 2
    },
    image: {
      height: width * 0.6,
      width: width * 0.6
    },
    main: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: layout.margin * 2
    },
    message: {
      ...typography.regular,
      color: theme.colors.text,
      textAlign: 'center'
    }
  })

  return (
    <View style={styles.main}>
      {!!image && <Image source={image} style={styles.image} />}
      <Text style={styles.message}>{message}</Text>
      {action && <Button style={styles.button} {...action} />}
    </View>
  )
}

import { RouteProp, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { Button } from '../../components/button'
import { ProfileParams } from '../../navigators/profile'
import { useAuth } from '../../store/auth'
import { layout, typography } from '../../styles'

type Props = {
  navigation: StackNavigationProp<ProfileParams, 'IP'>
  route: RouteProp<ProfileParams, 'IP'>
}

export const IpScene: FunctionComponent<Props> = ({ navigation: { pop } }) => {
  const theme = useTheme()
  const { formatMessage } = useIntl()

  const [{ locating }, { fetchCountryByIp }] = useAuth()

  const styles = StyleSheet.create({
    button: {
      marginTop: layout.margin
    },
    main: {
      alignItems: 'center',
      flexGrow: 1,
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
    <ScrollView contentContainerStyle={styles.main}>
      <Text style={styles.message}>
        {formatMessage({
          id: 'screen__profile__ip__message'
        })}
      </Text>
      <Button
        label={formatMessage({
          id: 'screen__profile__ip__fetch'
        })}
        loading={locating}
        onPress={() => fetchCountryByIp(pop)}
        style={styles.button}
      />
    </ScrollView>
  )
}

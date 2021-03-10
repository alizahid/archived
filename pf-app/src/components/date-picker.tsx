import { useTheme } from '@react-navigation/native'
import { startOfYear, subDays } from 'date-fns'
import React, { FunctionComponent, useState } from 'react'
import { useIntl } from 'react-intl'
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { layout, typography } from '../styles'
import { Calendar } from './calendar'

type Props = {
  from: Date
  style?: StyleProp<ViewStyle>
  to: Date

  onChange: (from: Date, to: Date) => void
}

export const DatePicker: FunctionComponent<Props> = ({
  from,
  onChange,
  style,
  to
}) => {
  const theme = useTheme()
  const { formatDate, formatMessage } = useIntl()

  const [fromVisible, setFromVisible] = useState(false)
  const [toVisible, setToVisible] = useState(false)

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      padding: layout.margin
    },
    date: {
      ...typography.regular,
      color: theme.colors.text,
      marginRight: layout.margin
    },
    main: {
      alignItems: 'center',
      borderBottomColor: theme.colors.border,
      borderBottomWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  })

  return (
    <>
      <View style={[styles.main, style]}>
        <Pressable
          onPress={() => setFromVisible(!fromVisible)}
          style={styles.button}>
          <Text style={styles.date}>{formatDate(from)}</Text>
          <Icon color={theme.colors.text} name="calendar" size={layout.icon} />
        </Pressable>
        <Pressable
          onPress={() => setToVisible(!toVisible)}
          style={styles.button}>
          <Text style={styles.date}>{formatDate(to)}</Text>
          <Icon color={theme.colors.text} name="calendar" size={layout.icon} />
        </Pressable>
      </View>

      <Calendar
        max={subDays(to, 1)}
        min={startOfYear(new Date(2020))}
        onChange={(next) => onChange(next, to)}
        onClose={() => setFromVisible(false)}
        title={formatMessage({ id: 'component__date_picker__from' })}
        value={from}
        visible={fromVisible}
      />

      <Calendar
        max={new Date()}
        min={from}
        onChange={(next) => onChange(from, next)}
        onClose={() => setToVisible(false)}
        title={formatMessage({ id: 'component__date_picker__to' })}
        value={to}
        visible={toVisible}
      />
    </>
  )
}

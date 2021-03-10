import { useTheme } from '@react-navigation/native'
import {
  addDays,
  addMonths,
  addYears,
  endOfMonth,
  format,
  formatISO,
  getDay,
  getDaysInMonth,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  lastDayOfMonth,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths
} from 'date-fns'
import { arSA, enUS } from 'date-fns/locale'
import range from 'lodash.range'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import {
  FlatList,
  I18nManager,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

import { colors, layout, rtl, typefaces, typography } from '../styles'
import { CalendarItem } from '../types'

type Props = {
  max?: Date
  min?: Date
  value: Date
  visible: boolean
  title: string

  onChange: (date: Date) => void
  onClose: () => void
}

export const Calendar: FunctionComponent<Props> = ({
  max,
  min,
  onChange,
  onClose,
  title,
  value,
  visible
}) => {
  const { bottom, top } = useSafeAreaInsets()
  const theme = useTheme()
  const { formatDate, locale } = useIntl()

  const locales: Record<string, Locale> = {
    ar: arSA,
    en: enUS,
    ur: enUS
  }

  const [date, setDate] = useState(value ?? new Date())

  const styles = StyleSheet.create({
    arrow: {
      padding: layout.margin
    },
    button: {
      flex: 1
    },
    day: {
      ...typography.regular,
      color: theme.colors.text,
      marginVertical: layout.padding,
      textAlign: 'center'
    },
    days: {
      marginBottom: layout.padding,
      marginHorizontal: layout.padding
    },
    disabled: {
      opacity: 0.25
    },
    faded: {
      opacity: 0.5
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row'
    },
    main: {
      backgroundColor: theme.colors.background,
      borderRadius: layout.radius * 2,
      width: '100%'
    },
    modal: {
      alignItems: 'center',
      backgroundColor: colors.modal,
      flex: 1,
      justifyContent: 'center',
      paddingBottom: bottom,
      paddingHorizontal: layout.margin * 2,
      paddingTop: top
    },
    month: {
      ...typography.regular,
      color: theme.colors.text,
      flex: 1,
      fontFamily: typefaces.inter.medium,
      textAlign: 'center'
    },
    selected: {
      backgroundColor: colors.primary,
      borderRadius: layout.radius
    },
    selectedDay: {
      color: theme.colors.background,
      fontFamily: typefaces.inter.medium
    },
    title: {
      ...typography.subtitle,
      color: theme.colors.text,
      marginTop: layout.padding,
      textAlign: 'center'
    },
    today: {
      color: colors.primary,
      fontFamily: typefaces.inter.medium
    },
    weekday: {
      opacity: 1
    },
    weekdayLabel: {
      fontFamily: typefaces.inter.medium
    }
  })

  const daysOfLastMonth = range(getDay(startOfMonth(date)))
  const daysOfNextMonth = range(6 - getDay(lastDayOfMonth(date))).map(
    (index) => index
  )

  const days: CalendarItem[] = [
    ...range(7).map((index) => ({
      date: addDays(startOfWeek(addYears(date, 1)), index),
      format: 'EEEEE'
    })),
    ...daysOfLastMonth.map((index) => ({
      date: subDays(
        endOfMonth(subMonths(date, 1)),
        daysOfLastMonth.length - index - 1
      ),
      format: 'd'
    })),
    ...range(getDaysInMonth(date)).map((index) => ({
      date: addDays(startOfMonth(date), index),
      format: 'd'
    })),
    ...daysOfNextMonth.map((index) => ({
      date: addDays(startOfMonth(addMonths(date, 1)), index),
      format: 'd'
    }))
  ]

  const isDisabled = useCallback(
    (item: CalendarItem) =>
      item.format === 'EEEEE' ||
      (min && isBefore(item.date, min)) ||
      (max && isAfter(item.date, max)),
    [min, max]
  )

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}>
      <Pressable
        onPress={(event) => {
          if (event.target === event.currentTarget) {
            onClose()
          }
        }}
        style={styles.modal}>
        <View style={styles.main}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.header}>
            <Pressable
              onPress={() => setDate(subMonths(date, 1))}
              style={styles.arrow}>
              <Icon
                color={theme.colors.text}
                name="arrow-back"
                size={layout.icon}
                style={I18nManager.isRTL && rtl.image}
              />
            </Pressable>
            <Text style={styles.month}>
              {formatDate(date, { month: 'long', year: 'numeric' })}
            </Text>
            <Pressable
              onPress={() => setDate(addMonths(date, 1))}
              style={styles.arrow}>
              <Icon
                color={theme.colors.text}
                name="arrow-forward"
                size={layout.icon}
                style={I18nManager.isRTL && rtl.image}
              />
            </Pressable>
          </View>
          <FlatList
            data={days}
            keyExtractor={(item) => formatISO(item.date)}
            numColumns={7}
            renderItem={({ item }) => {
              const disabled = isDisabled(item)

              return (
                <Pressable
                  disabled={disabled}
                  onPress={() => {
                    onChange(item.date)

                    if (!isSameMonth(date, item.date)) {
                      setDate(item.date)
                    }
                  }}
                  style={[
                    styles.button,
                    !isSameMonth(date, item.date) && styles.faded,
                    disabled && styles.disabled,
                    isSameDay(value, item.date) && styles.selected,
                    item.format === 'EEEEE' && styles.weekday
                  ]}>
                  <Text
                    style={[
                      styles.day,
                      isToday(item.date) && styles.today,
                      isSameDay(value, item.date) && styles.selectedDay,
                      item.format === 'EEEEE' && styles.weekdayLabel
                    ]}>
                    {format(item.date, item.format, {
                      locale: locales[locale]
                    })}
                  </Text>
                </Pressable>
              )
            }}
            style={styles.days}
          />
        </View>
      </Pressable>
    </Modal>
  )
}

import { RouteProp, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { FlatList, Pressable, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { ListSeparator } from '../../components/separator'
import { TextBox } from '../../components/text-box'
import { ProfileParams } from '../../navigators/profile'
import { useAuth } from '../../store/auth'
import { useSummary } from '../../store/summary'
import { layout, typography } from '../../styles'

type Props = {
  navigation: StackNavigationProp<ProfileParams, 'List'>
  route: RouteProp<ProfileParams, 'List'>
}

export const ListScene: FunctionComponent<Props> = () => {
  const theme = useTheme()
  const { formatMessage } = useIntl()

  const [{ country }, { setCountry }] = useAuth()
  const [{ countries, loading }, { fetch }] = useSummary()

  const [query, setQuery] = useState('')

  useEffect(() => {
    if (countries.length === 0) {
      fetch()
    }
  }, [countries.length, fetch])

  const styles = StyleSheet.create({
    icon: {
      marginLeft: layout.margin
    },
    item: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: layout.margin
    },
    name: {
      ...typography.regular,
      color: theme.colors.text,
      flex: 1,
      textAlign: 'left'
    }
  })

  let data = countries

  if (query) {
    data = data.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <>
      <TextBox
        onChangeText={(value) => setQuery(value)}
        placeholder={formatMessage({
          id: 'screen__profile__list__filter'
        })}
        value={query}
      />
      <ListSeparator />
      <FlatList
        ItemSeparatorComponent={ListSeparator}
        data={data}
        keyboardShouldPersistTaps="handled"
        onRefresh={fetch}
        refreshing={loading}
        renderItem={({ item }) => (
          <Pressable onPress={() => setCountry(item.name)} style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            {item.name === country && (
              <Icon
                color={theme.colors.text}
                name="checkmark"
                size={layout.icon}
                style={styles.icon}
              />
            )}
          </Pressable>
        )}
      />
    </>
  )
}

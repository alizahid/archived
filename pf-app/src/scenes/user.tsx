import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { subMonths } from 'date-fns'
import kebabCase from 'lodash.kebabcase'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { useIntl } from 'react-intl'
import { FlatList } from 'react-native'

import { DatePicker } from '../components/date-picker'
import { DetailCard } from '../components/detail'
import { Empty } from '../components/empty'
import { Refresh } from '../components/refresh'
import { ListSeparator } from '../components/separator'
import { img_hero_sign_in } from '../img'
import { UserParams } from '../navigators/user'
import { useAuth } from '../store/auth'
import { useDetails } from '../store/details'

type Props = {
  navigation: StackNavigationProp<UserParams, 'User'>
  route: RouteProp<UserParams, 'User'>
}

export const UserScene: FunctionComponent<Props> = () => {
  const { formatMessage, locale } = useIntl()
  const { navigate } = useNavigation()

  const [{ country }] = useAuth()
  const [{ data, loading }, { fetch }] = useDetails()

  const [from, setFrom] = useState(subMonths(new Date(), 1))
  const [to, setTo] = useState(new Date())

  const go = useCallback(() => {
    if (country) {
      fetch(locale, kebabCase(country.split(',').shift() as string), from, to)
    }
  }, [country, fetch, from, locale, to])

  useEffect(() => {
    go()
  }, [go])

  if (!country) {
    return (
      <Empty
        action={{
          label: formatMessage({
            id: 'sceen__user__empty__label'
          }),
          onPress: () => navigate('Profile')
        }}
        image={img_hero_sign_in}
        message={formatMessage({
          id: 'sceen__user__empty__message'
        })}
      />
    )
  }

  return (
    <>
      <DatePicker
        from={from}
        onChange={(nextFrom, nextTo) => {
          setFrom(nextFrom)
          setTo(nextTo)
        }}
        to={to}
      />
      <FlatList
        ItemSeparatorComponent={ListSeparator}
        data={data}
        refreshControl={<Refresh onRefresh={go} refreshing={loading} />}
        refreshing={loading}
        renderItem={({ item }) => <DetailCard data={item} />}
      />
    </>
  )
}

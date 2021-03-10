import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { Pressable, StyleSheet, View } from 'react-native'
import Map from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons'

import { HeaderButton } from '../../components/header'
import { ProfileParams } from '../../navigators/profile'
import { useAuth } from '../../store/auth'
import { useLocation } from '../../store/location'
import { colors, layout } from '../../styles'
import { Location } from '../../types'

type Props = {
  navigation: StackNavigationProp<ProfileParams, 'Profile'>
  route: RouteProp<ProfileParams, 'Profile'>
}

export const MapScene: FunctionComponent<Props> = ({
  navigation: { pop, setOptions }
}) => {
  const { locale } = useIntl()

  const [
    { locating, location: existing },
    { fetchCountryByLocation }
  ] = useAuth()
  const [, { getLocation }] = useLocation()

  const [location, setLocation] = useState<Location>(
    existing ?? {
      latitude: 25.0897173,
      longitude: 55.1506371
    }
  )

  const mapRef = useRef<Map>(null)

  const styles = StyleSheet.create({
    icon: {
      position: 'absolute',
      transform: [
        {
          translateY: -16
        }
      ]
    },
    locate: {
      backgroundColor: colors.background,
      bottom: layout.margin,
      padding: layout.padding,
      position: 'absolute',
      right: layout.margin
    },
    main: {
      flex: 1
    },
    map: {
      flex: 1
    },
    marker: {
      alignItems: 'center',
      bottom: 0,
      flex: 1,
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    }
  })

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButton
          icon="checkmark"
          loading={locating}
          onPress={() => fetchCountryByLocation(location, pop)}
        />
      )
    })
  }, [fetchCountryByLocation, locating, location, pop, setOptions])

  return (
    <View style={styles.main}>
      <Map
        initialRegion={{
          ...location,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        }}
        onRegionChangeComplete={({ latitude, longitude }) =>
          setLocation({
            latitude,
            longitude
          })
        }
        ref={mapRef}
        style={styles.map}
      />
      <Pressable
        onPress={async () => {
          const next = await getLocation(locale)

          if (next) {
            setLocation(next)

            mapRef.current?.animateToRegion({
              ...next,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02
            })
          }
        }}
        style={styles.locate}>
        <Icon color={colors.foreground} name="locate" size={layout.icon} />
      </Pressable>
      <View pointerEvents="none" style={styles.marker}>
        <Icon
          color={colors.foreground}
          name="location"
          size={layout.icon * 2}
          style={styles.icon}
        />
      </View>
    </View>
  )
}

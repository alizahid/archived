import React, { FunctionComponent } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useNavigation } from 'react-navigation-hooks'

import { colors, fonts, img_dark_back, layout, weights } from '../assets'
import { Touchable } from './touchable'

interface Props {
  action?: {
    icon: ImageSourcePropType
    onPress: () => void
  }
  back?: boolean
  title: string
}

export const NavBar: FunctionComponent<Props> = ({ action, back, title }) => {
  const { goBack } = useNavigation()
  const { top } = useSafeArea()

  return (
    <View
      style={[
        styles.main,
        {
          marginTop: top
        }
      ]}>
      {back && (
        <Touchable style={[styles.link, styles.back]} onPress={() => goBack()}>
          <Image style={styles.icon} source={img_dark_back} />
        </Touchable>
      )}
      <Text style={styles.title}>{title}</Text>
      {action && (
        <Touchable
          style={[styles.link, styles.action]}
          onPress={() => action.onPress()}>
          <Image style={styles.icon} source={action.icon} />
        </Touchable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  action: {
    right: 0
  },
  back: {
    left: 0
  },
  icon: {
    ...layout.icon
  },
  link: {
    alignItems: 'center',
    bottom: 0,
    height: layout.navBar.height,
    justifyContent: 'center',
    position: 'absolute',
    width: layout.navBar.height
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomColor: colors.border,
    borderBottomWidth: layout.border.width * 2,
    flexDirection: 'row',
    height: layout.navBar.height,
    justifyContent: 'center'
  },
  title: {
    ...fonts.subtitle,
    ...weights.medium
  }
})

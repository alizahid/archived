import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import { lowerCase, startCase } from 'lodash'

import { icon_date } from '../assets'
import { layout } from '../styles'
import { Article } from '../store/models'

interface Props {
  article: Article

  onPress(id: number): void
}

const Preview: FunctionComponent<Props> = ({
  article: { byline, id, thumb, published, title },
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.main} onPress={() => onPress(id)}>
      <Image
        style={styles.thumb}
        source={{
          uri: thumb
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.byline}>{startCase(lowerCase(byline))}</Text>
        <View style={styles.published}>
          <Image style={styles.icon} source={icon_date} />
          <Text style={styles.date}>{published.format('l')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  thumb: {
    backgroundColor: iOSColors.customGray,
    borderRadius: layout.image / 2,
    height: layout.image,
    width: layout.image
  },
  content: {
    flex: 1,
    marginLeft: layout.margin
  },
  title: {
    ...iOSUIKit.subheadObject
  },
  byline: {
    ...iOSUIKit.footnoteObject,
    color: iOSColors.gray,
    marginVertical: layout.padding
  },
  published: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    height: layout.icon,
    width: layout.icon
  },
  date: {
    ...iOSUIKit.footnoteObject,
    color: iOSColors.gray,
    marginLeft: layout.padding
  }
})

export default Preview

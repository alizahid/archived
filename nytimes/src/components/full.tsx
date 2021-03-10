import React, { FunctionComponent } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import { lowerCase, startCase } from 'lodash'

import { icon_date, icon_views } from '../assets'
import { Article } from '../store/models'
import { layout, shadow } from '../styles'

interface Props {
  article: Article
}

const Full: FunctionComponent<Props> = ({
  article: { abstract, byline, image, published, title, views }
}) => {
  return (
    <View>
      <View style={styles.hero}>
        <Image
          style={styles.image}
          source={{
            uri: image
          }}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.byline}>{startCase(lowerCase(byline))}</Text>
        <View style={styles.meta}>
          <View style={[styles.meta, styles.item]}>
            <Image style={styles.icon} source={icon_date} />
            <Text style={styles.label}>{published.format('l')}</Text>
          </View>
          <View style={[styles.meta, styles.item]}>
            <Image style={styles.icon} source={icon_views} />
            <Text style={styles.label}>{views}</Text>
          </View>
        </View>
        <Text style={styles.abstract}>{abstract}</Text>
      </View>
    </View>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  hero: {
    ...shadow,
    backgroundColor: iOSColors.white
  },
  image: {
    width,
    backgroundColor: iOSColors.black,
    height: width * (3 / 4)
  },
  content: {
    padding: layout.margin
  },
  title: {
    ...iOSUIKit.largeTitleEmphasizedObject
  },
  byline: {
    ...iOSUIKit.footnoteObject,
    color: iOSColors.gray,
    marginTop: layout.padding
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: -layout.margin,
    marginTop: layout.padding
  },
  item: {
    marginLeft: layout.margin,
    marginTop: 0
  },
  icon: {
    height: layout.icon,
    width: layout.icon
  },
  label: {
    ...iOSUIKit.footnoteObject,
    color: iOSColors.gray,
    marginLeft: layout.padding
  },
  abstract: {
    ...iOSUIKit.bodyObject,
    marginTop: layout.margin
  }
})

export default Full

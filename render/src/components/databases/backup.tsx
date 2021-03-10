import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { colors, fonts, img_dark_copy, layout } from '../../assets'
import { IBackup } from '../../graphql/types'
import { clippy } from '../../lib'
import { Touchable } from '../touchable'

interface Props {
  backup: IBackup
}

export const DatabaseBackup: FunctionComponent<Props> = ({ backup }) => (
  <View style={styles.main}>
    <View style={styles.header}>
      <Text style={styles.time}>{moment(backup.createdAt).format('lll')}</Text>
    </View>
    <Touchable
      style={styles.copyBase}
      onPress={() => clippy.copy(backup.baseUrl as string)}>
      <Image style={styles.icon} source={img_dark_copy} />
      <Text style={styles.label}>.tar.gz</Text>
    </Touchable>
    <Touchable
      style={styles.copySQL}
      onPress={() => clippy.copy(backup.sqlUrl as string)}>
      <Image style={styles.icon} source={img_dark_copy} />
      <Text style={styles.label}>.sql.gz</Text>
    </Touchable>
  </View>
)

const styles = StyleSheet.create({
  copyBase: {
    alignItems: 'center',
    padding: layout.margin
  },
  copySQL: {
    alignItems: 'center',
    padding: layout.margin
  },
  header: {
    flex: 1,
    padding: layout.margin
  },
  icon: {
    ...layout.icon
  },
  label: {
    ...fonts.small,
    marginTop: layout.padding
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'row'
  },
  time: {
    ...fonts.regular
  }
})

import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout } from '../../assets'
import { ILogEntry } from '../../graphql/types'
import { Terminal } from '../terminal'

interface Props {
  log: ILogEntry
}

export const ServiceLog: FunctionComponent<Props> = ({ log }) => (
  <View style={styles.main}>
    <Text style={styles.time}>
      {moment(Number(log.timestamp) / 1000 / 1000).format('lll')}
    </Text>
    <Terminal style={styles.text} text={log.text} />
  </View>
)

const styles = StyleSheet.create({
  main: {
    padding: layout.margin,
    paddingTop: 0
  },
  text: {
    marginTop: layout.padding / 2
  },
  time: {
    ...fonts.small,
    color: colors.foregroundLight
  }
})

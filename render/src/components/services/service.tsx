import { uniq } from 'lodash'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import {
  colors,
  fonts,
  img_github,
  img_gitlab,
  layout,
  services,
  weights
} from '../../assets'
import { IService } from '../../graphql/types'
import { Touchable } from '../touchable'

interface Props {
  service: IService

  onPress: () => void
}

export const Service: FunctionComponent<Props> = ({ onPress, service }) => (
  <Touchable style={styles.main} highlight onPress={() => onPress()}>
    <View style={styles.header}>
      <Image
        style={styles.icon}
        source={services[service.userFacingTypeSlug]}
      />
      <Text style={styles.name}>{service.name}</Text>
      <View
        style={[
          styles.state,
          {
            backgroundColor:
              service.state === 'Running'
                ? colors.status.running
                : service.state === 'Suspended'
                ? colors.status.suspended
                : colors.backgroundDark
          }
        ]}>
        <Text style={styles.stateLabel}>{service.state.toLowerCase()}</Text>
      </View>
    </View>
    <View style={styles.tags}>
      {uniq([service.userFacingType, service.env.name]).map((tag, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagLabel}>{tag}</Text>
        </View>
      ))}
    </View>
    <View style={styles.footer}>
      <View style={styles.repo}>
        <Image
          style={styles.icon}
          source={service.repo.provider === 'GITLAB' ? img_gitlab : img_github}
        />
        <Text style={styles.repoName}>
          {service.repo.ownerName}/{service.repo.name}
        </Text>
      </View>
      <Text style={styles.updated}>
        Updated {moment(service.updatedAt).fromNow()}
      </Text>
    </View>
  </Touchable>
)

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: layout.margin,
    marginTop: layout.padding / 2
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: layout.margin,
    marginBottom: layout.padding / 2
  },
  icon: {
    ...layout.icon,
    marginRight: layout.padding
  },
  main: {
    backgroundColor: colors.background
  },
  name: {
    ...fonts.regular,
    ...weights.medium,
    flex: 1
  },
  repo: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginRight: layout.padding
  },
  repoName: {
    ...fonts.small,
    color: colors.foregroundLight
  },
  state: {
    borderRadius: layout.border.radius,
    padding: layout.padding / 2
  },
  stateLabel: {
    ...fonts.small,
    color: colors.background
  },
  tag: {
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.border.radius,
    margin: layout.padding,
    padding: layout.padding / 2
  },
  tagLabel: {
    ...fonts.small
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: layout.padding
  },
  updated: {
    ...fonts.small,
    color: colors.foregroundLight,
    flex: 1,
    textAlign: 'right'
  }
})

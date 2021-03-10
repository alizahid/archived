import md5 from 'md5'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { colors, fonts, layout } from '../../assets'
import { useAuth } from '../../store'
import { IServiceCollaborator } from '../../store/types'

interface Props {
  collaborator: IServiceCollaborator
}

export const ServiceCollaborator: FunctionComponent<Props> = ({
  collaborator
}) => {
  const [{ email }] = useAuth()

  return (
    <View style={styles.main}>
      <Image
        style={styles.avatar}
        source={{
          uri: `https://www.gravatar.com/avatar/${md5(
            collaborator.email
          )}?d=mm&r=x&s=200`
        }}
      />
      <Text style={styles.email}>{collaborator.email}</Text>
      {email === collaborator.email && (
        <View style={styles.tag}>
          <Text style={styles.tagLabel}>you</Text>
        </View>
      )}
      {collaborator.pending && (
        <View style={styles.tag}>
          <Text style={styles.tagLabel}>pending</Text>
        </View>
      )}
      {collaborator.role === 'owner' && (
        <View style={styles.tag}>
          <Text style={styles.tagLabel}>owner</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    ...layout.icon,
    borderRadius: layout.icon.height,
    marginRight: layout.padding
  },
  email: {
    ...fonts.regular
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'row',
    padding: layout.margin
  },
  tag: {
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.border.radius,
    marginLeft: layout.padding,
    padding: layout.padding / 2
  },
  tagLabel: {
    ...fonts.small
  }
})

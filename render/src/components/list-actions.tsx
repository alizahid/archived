import React, { FunctionComponent } from 'react'
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View
} from 'react-native'

import { colors, img_light_edit, img_light_remove, layout } from '../assets'
import { Touchable } from './touchable'

interface Props {
  action?: {
    color: string
    icon: ImageSourcePropType
    loading: boolean

    onPress: () => void
  }
  loading?: boolean

  onEdit?: () => void
  onDelete?: () => void
}

export const ListActions: FunctionComponent<Props> = ({
  action,
  loading,
  onDelete,
  onEdit
}) => (
  <View style={styles.actions}>
    {action && (
      <Touchable
        style={[
          styles.action,
          {
            backgroundColor: action.color
          }
        ]}
        onPress={() => action.onPress()}>
        {action.loading ? (
          <ActivityIndicator style={styles.spinner} color={colors.background} />
        ) : (
          <Image style={styles.icon} source={action.icon} />
        )}
      </Touchable>
    )}
    {onEdit && (
      <Touchable style={[styles.action, styles.edit]} onPress={() => onEdit()}>
        <Image style={styles.icon} source={img_light_edit} />
      </Touchable>
    )}
    {onDelete && (
      <Touchable
        style={[styles.action, styles.delete]}
        onPress={() => onDelete()}>
        {loading ? (
          <ActivityIndicator style={styles.spinner} color={colors.background} />
        ) : (
          <Image style={styles.icon} source={img_light_remove} />
        )}
      </Touchable>
    )}
  </View>
)

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  actions: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  delete: {
    backgroundColor: colors.state.error
  },
  edit: {
    backgroundColor: colors.state.message
  },
  icon: {
    ...layout.icon,
    marginHorizontal: layout.margin
  },
  spinner: {
    marginHorizontal: layout.margin
  }
})

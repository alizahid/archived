import React, { FunctionComponent, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { iOSUIKit } from 'react-native-typography'

import { img_checkbox_checked, img_checkbox_unchecked } from '../assets'
import { layout } from '../styles'

type CheckListItem = {
  label: string
  value: string
}

interface Props {
  data: CheckListItem[]
  style?: ViewStyle

  onChange: (items: string[]) => void
}

export const CheckList: FunctionComponent<Props> = ({
  data,
  onChange,
  style
}) => {
  const [selected, setSelected] = useState(new Map())

  return (
    <FlatList
      data={data}
      initialNumToRender={data.length}
      keyExtractor={(item) => item.value}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            const next = new Map(selected)

            if (next.get(item.value)) {
              next.delete(item.value)
            } else {
              next.set(item.value, true)
            }

            setSelected(next)

            onChange(Array.from(next.keys()))
          }}
          style={styles.item}>
          <FastImage
            source={
              selected.get(item.value)
                ? img_checkbox_checked
                : img_checkbox_unchecked
            }
            style={styles.icon}
          />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      )}
      scrollEnabled={false}
      style={style}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    height: layout.icon,
    width: layout.icon
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: layout.padding
  },
  label: {
    ...iOSUIKit.bodyObject,
    marginLeft: layout.padding
  }
})

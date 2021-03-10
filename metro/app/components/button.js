import React, { Component } from 'react'

import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'

import { Text, Touchable } from './'
import { Colors, Layout } from '../styles'

export default class Button extends Component {
  render() {
    const {
      children,
      icon,
      label,
      loading,
      onPress,
      spinnerColor,
      style,
      styleIcon,
      styleLabel,
      styleTouchable
    } = this.props

    return (
      <View style={[styles.container, style]}>
        {loading && (
          <View style={[styles.touchable, styleTouchable]}>
            <ActivityIndicator
              style={styles.spinner}
              color={spinnerColor || Colors.background}
            />
          </View>
        )}
        {!loading && (
          <Touchable
            style={[styles.touchable, styleTouchable]}
            onPress={onPress}
          >
            {children}
            {icon && <Image style={[styles.icon, styleIcon]} source={icon} />}
            {label && <Text style={[styles.label, styleLabel]}>{label}</Text>}
          </Touchable>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    borderRadius: Layout.radius,
    minHeight: Layout.buttonHeight
  },
  touchable: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  spinner: {
    marginHorizontal: Layout.margin
  },
  label: {
    color: Colors.background,
    marginHorizontal: Layout.padding
  },
  icon: {
    height: 20,
    marginHorizontal: Layout.margin,
    width: 20
  }
})

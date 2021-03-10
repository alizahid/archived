import MultiSlider from '@ptomasroos/react-native-multi-slider'
import React, { FunctionComponent } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { iOSUIKit } from 'react-native-typography'

import { img_clouds, img_slider, img_slider_background } from '../assets'
import { data_exercise } from '../data'
import { layout } from '../styles'

interface Props {
  level: number

  onChange: (level: number) => void
}

export const Slider: FunctionComponent<Props> = ({ level, onChange }) => {
  const { width } = Dimensions.get('window')

  const height = width * 0.7

  return (
    <View style={styles.main}>
      <Text style={styles.description}>
        To get your perfect workouts,{'\n'}tell us your activity level!{'\n\n'}
        Drag the space ship to set your level.
      </Text>
      <View style={styles.slider}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={img_clouds}
          style={styles.background}
        />
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={img_slider_background}
          style={styles.sliderTrack}
        />
        <View style={styles.multiSlider}>
          <MultiSlider
            customMarker={() => (
              <View>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={img_slider}
                  style={styles.sliderBall}
                />
                <Text style={styles.level}>{level}</Text>
              </View>
            )}
            max={5}
            min={1}
            onValuesChange={([value]) => {
              onChange(value)
            }}
            selectedStyle={styles.transparent}
            sliderLength={height}
            trackStyle={styles.transparent}
            values={[level]}
            vertical
          />
        </View>
      </View>
      <Text style={styles.description}>{data_exercise[level]}</Text>
    </View>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  background: {
    height: width,
    width
  },
  description: {
    ...iOSUIKit.calloutObject,
    margin: layout.margin,
    textAlign: 'center'
  },
  level: {
    ...iOSUIKit.footnoteEmphasizedObject,
    height: 20,
    left: 66,
    position: 'absolute',
    textAlign: 'center',
    top: 64,
    transform: [
      {
        rotate: '90deg'
      }
    ],
    width: 20
  },
  main: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  multiSlider: {
    height: width,
    position: 'absolute',
    top: width * 0.3,
    width: width
  },
  slider: {
    flex: 1
  },
  sliderBall: {
    height: 148,
    marginTop: 2,
    transform: [
      {
        rotate: '90deg'
      }
    ],
    width: 78
  },
  sliderTrack: {
    height: width * 0.7,
    margin: width * 0.15,
    position: 'absolute',
    width: width * 0.7
  },
  transparent: {
    backgroundColor: 'transparent'
  }
})

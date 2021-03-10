import { get } from 'immutable'
import React, { createRef, FunctionComponent, useEffect } from 'react'
import { Animated, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import {
  PanGestureHandler,
  PinchGestureHandler,
  State
} from 'react-native-gesture-handler'

import { useDimensions } from '../hooks'
import { useComics } from '../store'
import { ComicInterface } from '../types'
import { Spinner } from './spinner'

interface Props {
  comic: ComicInterface
  number: number
}

export const Page: FunctionComponent<Props> = ({ comic, number }) => {
  const [{ pages }, { getPage }] = useComics()

  const { width } = useDimensions()

  const scale = new Animated.Value(1)
  const translateX = new Animated.Value(0)
  const translateY = new Animated.Value(0)

  const pan = createRef<PanGestureHandler>()
  const pinch = createRef<PinchGestureHandler>()

  useEffect(() => {
    getPage(comic.id, number)
  }, [comic.id, number, getPage])

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      width
    }
  })

  const uri = get(pages, `${comic.id}.${number}`) as string

  if (!uri) {
    return <Spinner style={styles.main} />
  }

  const Image = Animated.createAnimatedComponent(FastImage)

  return (
    <PinchGestureHandler
      onGestureEvent={Animated.event(
        [
          {
            nativeEvent: {
              scale
            }
          }
        ],
        {
          useNativeDriver: true
        }
      )}
      onHandlerStateChange={event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true
          }).start()
        }
      }}
      ref={pinch}
      simultaneousHandlers={pan}>
      <Animated.View style={styles.main}>
        <PanGestureHandler
          minPointers={2}
          onGestureEvent={Animated.event([
            {
              nativeEvent: {
                translationX: translateX,
                translationY: translateY
              }
            }
          ])}
          onHandlerStateChange={event => {
            if (event.nativeEvent.oldState === State.ACTIVE) {
              Animated.parallel([
                Animated.spring(translateX, {
                  toValue: 0,
                  useNativeDriver: true
                }),
                Animated.spring(translateY, {
                  toValue: 0,
                  useNativeDriver: true
                })
              ]).start()
            }
          }}
          ref={pan}
          simultaneousHandlers={pinch}>
          <Animated.View style={styles.main}>
            <Image
              resizeMode={FastImage.resizeMode.contain}
              source={{
                uri
              }}
              style={[
                styles.main,
                {
                  transform: [
                    {
                      scale
                    },
                    {
                      translateX
                    },
                    {
                      translateY
                    }
                  ]
                }
              ]}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  )
}

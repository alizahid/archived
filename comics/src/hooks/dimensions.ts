import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

export const useDimensions = () => {
  const dimensions = Dimensions.get('window')

  const [height, setHeight] = useState(dimensions.height)
  const [width, setWidth] = useState(dimensions.width)

  useEffect(() => {
    const handler = () => {
      const { height, width } = Dimensions.get('window')

      setHeight(height)
      setWidth(width)
    }

    Dimensions.addEventListener('change', handler)

    return () => Dimensions.removeEventListener('change', handler)
  }, [])

  return {
    height,
    width
  }
}

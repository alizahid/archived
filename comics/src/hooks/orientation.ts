import { useDimensions } from './dimensions'

export const useOrientation = () => {
  const { height, width } = useDimensions()

  return {
    isLandscape: width > height,
    isPortrait: height > width
  }
}

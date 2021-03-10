import React, { FunctionComponent } from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'

import { colors } from '../assets'

export const Refresher: FunctionComponent<RefreshControlProps> = props => (
  <RefreshControl
    {...props}
    colors={[colors.primary]}
    tintColor={colors.primary}
  />
)

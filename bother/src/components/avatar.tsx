import React, { FunctionComponent } from 'react'
import { Image } from 'react-native'
import Identicon from 'identicon.js'

import { IUser } from '../data'
import { layout } from '../styles'

interface Props {
  large?: boolean
  user: IUser
}

const Avatar: FunctionComponent<Props> = ({ large, user: { id } }) => {
  const size = large ? layout.icon.large : layout.icon.small

  const avatar = new Identicon(id, {
    margin: 0,
    size: size * 2
  }).toString()

  return (
    <Image
      style={{
        borderRadius: layout.border.radius,
        height: size,
        width: size
      }}
      source={{
        uri: `data:image/png;base64,${avatar}`
      }}
    />
  )
}

export default Avatar

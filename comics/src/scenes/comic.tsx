import { RouteProp } from '@react-navigation/native'
import React, { FunctionComponent, useEffect } from 'react'
import { FlatList } from 'react-native'

import { StackParamList } from '..'
import { Page } from '../components'
import { useComics } from '../store'

interface Props {
  route: RouteProp<StackParamList, 'Comic'>
}

export const Comic: FunctionComponent<Props> = ({
  route: {
    params: { comic }
  }
}) => {
  const [{ total }, { getPages }] = useComics()

  useEffect(() => {
    getPages(comic.id)
  }, [comic.id, getPages])

  const pages = new Array(total[comic.id]).fill(0)

  return (
    <FlatList
      data={pages}
      horizontal
      initialNumToRender={5}
      keyExtractor={(item, index) => String(index)}
      pagingEnabled
      renderItem={({ index }) => <Page comic={comic} number={index + 1} />}
      showsHorizontalScrollIndicator={false}
    />
  )
}

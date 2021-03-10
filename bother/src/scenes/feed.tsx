import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { NavigationScreenComponent } from 'react-navigation'
import { TabView, SceneMap } from 'react-native-tab-view'
import { useQuery } from 'react-apollo-hooks'

import { PostList, PostsTabBar } from '../components'
import { query } from '../data'

const initialState = {
  index: 0,
  routes: [
    {
      key: 'Nearby'
    },
    {
      key: 'Popular'
    },
    {
      key: 'Latest'
    }
  ]
}

const Feed: NavigationScreenComponent = () => {
  const latest = useQuery(query.latest)
  const nearby = useQuery(query.nearby, {
    variables: {
      location: 'Dubai'
    }
  })
  const popular = useQuery(query.popular)

  const Latest = () => <PostList result={latest} type="latest" />
  const Nearby = () => <PostList result={nearby} type="nearby" />
  const Popular = () => <PostList result={popular} type="popular" />

  const [state, setState] = useState(initialState)

  const onIndexChange = (index: number) =>
    setState({
      ...initialState,
      index
    })

  const { index, routes } = state

  const { width } = Dimensions.get('window')

  return (
    <TabView
      initialLayout={{
        width
      }}
      navigationState={state}
      onIndexChange={onIndexChange}
      renderScene={SceneMap({
        Nearby,
        Popular,
        Latest
      })}
      renderTabBar={() => (
        <PostsTabBar
          index={index}
          onIndexChange={onIndexChange}
          routes={routes}
        />
      )}
    />
  )
}

Feed.navigationOptions = {
  header: null
}

export default Feed

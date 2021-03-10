import React, { useLayoutEffect } from 'react'
import { FlatList, RefreshControl, StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView, NavigationScreenComponent } from 'react-navigation'
import { iOSColors } from 'react-native-typography'
import { orderBy } from 'lodash'

import { Loading, Periods, Preview, Separator } from '../components'
import { useActions, useStore } from '../store'

const Home: NavigationScreenComponent = ({ navigation: { navigate } }) => {
  const { articles, interval, loading } = useStore(state => state.articles)
  const { fetchArticles } = useActions(actions => actions.articles)

  useLayoutEffect(() => {
    fetchArticles(interval)
  }, [interval, fetchArticles])

  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        top: 'never'
      }}
    >
      <StatusBar
        backgroundColor={iOSColors.customGray}
        barStyle="dark-content"
      />
      <FlatList
        contentContainerStyle={styles.content}
        data={orderBy(articles, 'published', 'desc')}
        ItemSeparatorComponent={Separator}
        keyExtractor={({ id }) => String(id)}
        ListEmptyComponent={<Loading />}
        refreshControl={
          <RefreshControl
            colors={[iOSColors.green]}
            onRefresh={() => fetchArticles(interval)}
            refreshing={loading}
            tintColor={iOSColors.green}
          />
        }
        renderItem={({ item }) => (
          <Preview
            article={item}
            onPress={id =>
              navigate('Article', {
                id
              })
            }
          />
        )}
      />
    </SafeAreaView>
  )
}

Home.navigationOptions = {
  header: <Periods />
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  content: {
    flexGrow: 1
  }
})

export default Home

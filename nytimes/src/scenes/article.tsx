import React from 'react'
import { ScrollView, StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView, NavigationScreenComponent } from 'react-navigation'
import { iOSColors } from 'react-native-typography'

import { Full, NotFound } from '../components'
import { useStore } from '../store'

interface Props {
  id: number
}

const Article: NavigationScreenComponent<Props> = ({
  navigation: { getParam }
}) => {
  const { articles } = useStore(state => state.articles)

  const id = getParam('id')

  const article = articles.find(article => article.id === id)

  if (!article) {
    return <NotFound />
  }

  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        top: 'never'
      }}
    >
      <StatusBar backgroundColor={iOSColors.black} barStyle="light-content" />
      <ScrollView>
        <Full article={article} />
      </ScrollView>
    </SafeAreaView>
  )
}

Article.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})

export default Article

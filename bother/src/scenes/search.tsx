import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, NavigationScreenComponent } from 'react-navigation'
import { useQuery } from 'react-apollo-hooks'

import { pink_not_found } from '../assets'
import { Posts, TextBox } from '../components'
import { query } from '../data'
import { colors, layout, shadow } from '../styles'

const Search: NavigationScreenComponent = () => {
  const [text, setText] = useState('')

  const { data, error, loading, refetch } = useQuery(query.search, {
    variables: {
      query: text
    }
  })

  return (
    <>
      <SafeAreaView style={styles.main}>
        <TextBox
          style={styles.search}
          autoCorrect={false}
          autoFocus
          clearButton
          onChangeText={text => setText(text)}
          placeholder="Type something to search"
          value={text}
        />
      </SafeAreaView>
      {!loading && text.length > 0 && (
        <>
          {data.search.length === 0 && (
            <View style={styles.empty}>
              <Image style={styles.notFound} source={pink_not_found} />
              <Text>Nothing found</Text>
            </View>
          )}
          {data.search.length > 0 && (
            <Posts
              error={error}
              posts={data.search}
              loading={loading}
              refetch={refetch}
            />
          )}
        </>
      )}
    </>
  )
}

Search.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  main: {
    ...shadow,
    backgroundColor: colors.background
  },
  search: {
    backgroundColor: colors.background,
    borderRadius: 0
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  notFound: {
    height: layout.icon.hero,
    marginBottom: layout.margin,
    width: layout.icon.hero
  }
})

export default Search

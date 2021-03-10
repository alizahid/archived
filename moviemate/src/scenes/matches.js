import { API_URI, TMDB_IMAGE_URI } from 'react-native-dotenv'

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux'

import { avatar, moviemate } from '../assets'
import { Footer, Touchable } from '../components'

export default class Matches extends Component {
  state = {
    loading: true
  }

  async componentDidMount() {
    const { one, two } = this.props

    const response = await fetch(`${API_URI}/matches/${one.id}/${two.id}`)

    const results = await response.json()

    this.setState({
      results,
      loading: false
    })
  }

  renderPerson = (item, index) => {
    const { image, name } = item

    const Photo = (() => {
      if (image) {
        return (
          <Image
            style={styles.image}
            source={{
              uri: `${TMDB_IMAGE_URI}/h632/${image}`
            }}
          />
        )
      }

      return (
        <View style={styles.image}>
          <Image style={styles.empty} source={avatar} />
        </View>
      )
    })()

    const even = index % 2 === 1

    return (
      <View style={[styles.item, even && styles.itemEven]} key={name}>
        {Photo}
        <Text style={[styles.label, even && styles.labelEven]}>{name}</Text>
      </View>
    )
  }

  renderFilm = (film, index) => {
    const { image, name, year } = film

    const even = index % 2 === 1

    return (
      <View style={[styles.item, even && styles.itemEven]} key={name}>
        <Image
          style={styles.image}
          source={{
            uri: `${TMDB_IMAGE_URI}/w500/${image}`
          }}
        />
        <Text style={[styles.label, even && styles.labelEven]}>{name}</Text>
        <Text style={[styles.year, even && styles.labelEven]}>{year}</Text>
      </View>
    )
  }

  render() {
    const { loading, results } = this.state

    return (
      <ScrollView style={styles.main} contentContainerStyle={styles.container}>
        <Touchable style={styles.back} onPress={Actions.pop}>
          <Text style={styles.backLabel}>Back</Text>
        </Touchable>
        <Image style={styles.logo} source={moviemate} />
        {loading && (
          <ActivityIndicator style={styles.spinner} color="#e80c30" />
        )}
        {!loading && (
          <View>
            <View style={styles.results}>
              {results.people.map(this.renderPerson)}
            </View>
            <View style={styles.results}>
              {results.films.map(this.renderFilm)}
            </View>
          </View>
        )}
        {!loading && results.films.length === 0 && (
          <Text style={styles.notFound}>Nothing found</Text>
        )}
        <Footer style={styles.footer} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff'
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  back: {
    padding: 20,
    left: 0,
    position: 'absolute',
    top: 0
  },
  backLabel: {
    color: '#e80c30',
    fontWeight: '500'
  },
  logo: {
    alignSelf: 'center',
    height: 100,
    marginBottom: 40,
    marginTop: 80,
    width: 100
  },
  spinner: {
    margin: 20
  },
  results: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 0
  },
  item: {
    marginTop: 20,
    width: '50%'
  },
  itemEven: {
    alignItems: 'flex-end'
  },
  image: {
    alignItems: 'center',
    backgroundColor: '#fd902b',
    borderRadius: 4,
    height: 200,
    justifyContent: 'center',
    resizeMode: 'cover',
    width: 150
  },
  empty: {
    height: 75,
    width: 75
  },
  label: {
    color: '#000',
    marginTop: 10
  },
  labelEven: {
    textAlign: 'right'
  },
  year: {
    color: '#999',
    marginTop: 10
  },
  notFound: {
    color: '#e80c30',
    margin: 20,
    textAlign: 'center'
  },
  footer: {
    marginBottom: 40
  }
})

const { TMDB_API_KEY, TMDB_API_URI } = process.env

const request = require('request-promise-native')

const error = require('./error')

class TMDB {
  async search(name) {
    const query = encodeURIComponent(name)

    const data = await this.request(`/search/person?query=${query}`)

    const { results } = JSON.parse(data)

    return results.slice(0, 10).map(({ id, name, profile_path: image }) => ({
      id,
      image,
      name
    }))
  }

  async films(person) {
    const data = await this.request(
      `/person/${person}?append_to_response=movie_credits`
    )

    const {
      id,
      name,
      success,
      movie_credits: credits,
      profile_path: image
    } = JSON.parse(data)

    if (success === false) {
      throw error.personNotFound
    }

    const { cast } = credits

    return {
      id,
      image,
      name,
      films: cast
        .filter(({ character }) => !/(him|her)self/i.test(character))
        .map(
          ({
            id,
            title,
            poster_path: image,
            release_date: date,
            vote_average: rating
          }) => ({
            id,
            image,
            rating,
            name: title,
            year: Number(String(date).substr(0, 4))
          })
        )
    }
  }

  request(uri) {
    return request(`${TMDB_API_URI}${uri}&api_key=${TMDB_API_KEY}`)
  }
}

module.exports = new TMDB()

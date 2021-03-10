// @ts-ignore
import { API_KEY, API_URI } from 'react-native-dotenv'

import { get } from 'lodash'
import moment from 'moment'

export default class API {
  static async fetchArticles(interval: number) {
    const response = await fetch(
      `${API_URI}/${interval}.json?api-key=${API_KEY}`
    )

    const { results } = await response.json()

    return results.map(
      ({
        abstract,
        byline,
        id,
        media,
        published_date,
        title,
        url,
        views
      }: any) => {
        const images = get(media, '0.media-metadata', [])

        return {
          abstract,
          byline,
          id,
          title,
          url,
          views,
          image: get(
            images.find(({ format }: any) => format === 'Jumbo'),
            'url'
          ),
          published: moment(published_date),
          thumb: get(
            images.find(({ format }: any) => format === 'square320'),
            'url'
          )
        }
      }
    )
  }
}

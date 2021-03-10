import moment from 'moment'

import { Article } from '../../src/store/models'

export { default as data } from './data.json'

export const article: Article = {
  abstract:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut laoreet ex. Praesent eu volutpat nibh, vel suscipit eros.',
  byline: 'By Ali Zahid',
  id: 1,
  image: 'https://via.placeholder.com/800x600',
  published: moment()
    .year(2019)
    .month(5)
    .date(2),
  thumb: 'https://via.placeholder.com/150',
  title: 'A test article',
  url: 'https://designplox.com',
  views: 10
}

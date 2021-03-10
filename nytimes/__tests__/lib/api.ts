import { api } from '../../src/lib'

import { data } from '../fixtures'

test('fetches', async () => {
  fetch.mockResponseOnce(JSON.stringify(data))

  const articles = await api.fetchArticles(1)

  expect(articles).toMatchSnapshot()
})

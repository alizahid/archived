exports = async function({ query }) {
  const { all } = query

  const collection = context.services
    .get('mongodb')
    .db('alizahid')
    .collection('posts')

  const options = {}

  if (all === undefined) {
    options.published = {
      $lt: new Date(),
      $ne: ''
    }
  }

  const posts = await collection
    .find(options, {
      excerpt: 1,
      published: 1,
      slug: 1,
      tags: 1,
      title: 1
    })
    .sort({
      published: -1
    })
    .toArray()

  return {
    posts
  }
}

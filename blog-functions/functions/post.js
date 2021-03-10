exports = async function({ query }) {
  const { slug } = query

  const collection = context.services
    .get('mongodb')
    .db('alizahid')
    .collection('posts')

  const post = await collection.findOne({
    slug
  })

  return {
    post
  }
}

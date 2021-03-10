exports = async function({ body, query }) {
  const { id } = query
  const { content, excerpt, published, slug, tags, title } = JSON.parse(
    body.text()
  )

  const collection = context.services
    .get('mongodb')
    .db('alizahid')
    .collection('posts')

  const _id = BSON.ObjectId(id)

  await collection.updateOne(
    {
      _id
    },
    {
      content,
      excerpt,
      slug,
      tags,
      title,
      published: new Date(published)
    }
  )

  const post = await collection.findOne({
    _id
  })

  return {
    post
  }
}

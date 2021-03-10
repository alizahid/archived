exports = async function({ body }) {
  const { content, excerpt, published, slug, tags, title } = JSON.parse(
    body.text()
  )

  const collection = context.services
    .get('mongodb')
    .db('alizahid')
    .collection('posts')

  const { insertedId } = await collection.insertOne({
    content,
    excerpt,
    slug,
    tags,
    title,
    published: new Date(published)
  })

  const post = await collection.findOne({
    _id: insertedId
  })

  return {
    post
  }
}

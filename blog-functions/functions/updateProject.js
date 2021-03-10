exports = async function({ body, query }) {
  const { id } = query
  const { description, links, name, order } = JSON.parse(body.text())

  const collection = context.services
    .get('mongodb')
    .db('alizahid')
    .collection('projects')

  const _id = BSON.ObjectId(id)

  await collection.updateOne(
    {
      _id
    },
    {
      description,
      links,
      name,
      order
    }
  )

  const project = await collection.findOne({
    _id
  })

  return {
    project
  }
}

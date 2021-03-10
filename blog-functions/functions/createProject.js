exports = async function({ body }) {
  const { description, links, name, order = 1 } = JSON.parse(body.text())

  const collection = context.services
    .get('mongodb')
    .db('alizahid')
    .collection('projects')

  const { insertedId } = await collection.insertOne({
    name,
    description,
    links,
    order
  })

  const project = await collection.findOne({
    _id: insertedId
  })

  return {
    project
  }
}

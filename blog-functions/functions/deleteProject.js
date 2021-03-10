exports = async function({ query }) {
  const { id } = query

  const collection = context.services
    .get('mongodb')
    .db('alizahid')
    .collection('projects')

  const _id = BSON.ObjectId(id)

  const { deletedCount } = await collection.deleteOne({
    _id
  })

  return {
    deletedCount
  }
}

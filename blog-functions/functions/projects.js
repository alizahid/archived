exports = async function() {
  const collection = context.services
    .get('mongodb')
    .db('alizahid')
    .collection('projects')

  const projects = await collection
    .find()
    .sort({
      order: 1
    })
    .toArray()

  return {
    projects
  }
}

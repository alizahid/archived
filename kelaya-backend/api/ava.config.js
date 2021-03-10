export default {
  require: ['ts-node/register'],
  typescript: {
    rewritePaths: {
      'src/': 'build/'
    }
  }
}

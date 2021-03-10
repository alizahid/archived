export default {
  failFast: true,
  require: ['ts-node/register'],
  typescript: {
    rewritePaths: {
      'src/': 'build/'
    }
  },
  verbose: true
}

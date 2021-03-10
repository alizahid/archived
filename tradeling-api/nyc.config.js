module.exports = {
  all: true,
  'check-coverage': true,
  exclude: ['**/index.ts'],
  extends: '@istanbuljs/nyc-config-typescript',
  include: ['src'],
  reporter: ['html']
}

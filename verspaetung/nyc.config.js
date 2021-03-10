module.exports = {
  all: true,
  'check-coverage': true,
  exclude: ['src/index.ts'],
  extends: '@istanbuljs/nyc-config-typescript',
  extension: ['.ts'],
  include: ['src/**/*.ts'],
  reporter: ['lcov', 'html', 'text']
}

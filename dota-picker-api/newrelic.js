const { NEW_RELIC_LICENSE_KEY } = process.env

exports.config = {
  app_name: ['Dota Picker'],
  license_key: NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info'
  }
}

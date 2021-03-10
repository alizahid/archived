module.exports = {
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            username: {
              type: 'string'
            },
            admin: {
              type: 'boolean'
            },
            token: {
              type: 'string'
            }
          }
        }
      }
    }
  }
}

module.exports = {
  response: {
    200: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
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
              }
            }
          }
        }
      }
    }
  }
}

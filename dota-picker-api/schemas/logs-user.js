module.exports = {
  response: {
    200: {
      type: 'object',
      properties: {
        logs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string'
              },
              hero: {
                type: 'string'
              },
              changes: {
                type: 'object',
                properties: {
                  attack: {
                    type: 'string'
                  },
                  attribute: {
                    type: 'string'
                  },
                  type: {
                    type: 'string'
                  },
                  id: {
                    type: 'string'
                  },
                  why: {
                    type: 'string'
                  },
                  roles: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              },
              action: {
                type: 'string'
              },
              created: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
}

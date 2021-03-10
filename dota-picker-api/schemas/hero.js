module.exports = {
  response: {
    200: {
      type: 'object',
      properties: {
        hero: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            name: {
              type: 'string'
            },
            attack: {
              type: 'string'
            },
            attribute: {
              type: 'string'
            },
            roles: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            strong: {
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
                  why: {
                    type: 'string'
                  }
                }
              }
            },
            weak: {
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
                  why: {
                    type: 'string'
                  }
                }
              }
            },
            combo: {
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
                  why: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

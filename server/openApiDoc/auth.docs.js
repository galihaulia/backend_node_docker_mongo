const util1 = require('../utils/apiBuildHandler')
const tag = 'AuthController'
const schema = {
  registration: {
    title: 'User Creation',
    properties: {
      user_name: {
        type: 'string',
      },
      account_number: {
        type: 'string',
      },
      email_address: {
        type: 'string',
      },
      identity_number: {
        type: 'string',
      },
    },
  },
  login: {
    title: 'User Login',
    properties: {
      email_address: {
        type: 'string',
      },
      account_number: {
        type: 'number',
      },
    },
  },
}
const paths = {
  '/register': {
    post: {
      tags: [tag],
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('registration'),
          },
        },
      },
      responses: {
        200: {
          description: 'User Creation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/login': {
    post: {
      tags: [tag],
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('login'),
          },
        },
      },
      responses: {
        200: {
          description: 'Login User',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

exports.default = { schema, paths }
